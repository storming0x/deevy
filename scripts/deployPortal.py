from pathlib import Path

from brownie import LootPortal, Loot, accounts, config, network, project, web3
from eth_utils import is_checksum_address
import click

## Rinkeby Loot copy = 0x861C465Aa16274C51DFB015fFf345F10AAF40015


def get_address(msg: str, default: str = None) -> str:
    val = click.prompt(msg, default=default)

    # Keep asking user for click.prompt until it passes
    while True:

        if is_checksum_address(val):
            return val
        elif addr := web3.ens.address(val):
            click.echo(f"Found ENS '{val}' [{addr}]")
            return addr

        click.echo(
            f"I'm sorry, but '{val}' is not a checksummed address or valid ENS record"
        )
        # NOTE: Only display default once
        val = click.prompt(msg)


def main():
    print(f"You are using the '{network.show_active()}' network")
    dev = accounts.load(click.prompt("Account", type=click.Choice(accounts.load())))
    print(f"You are using: 'dev' [{dev.address}]")

    deploy_loot_copy = False
    if input("Deploy Loot Contract Copy? y/[N]: ").lower() == "y":
        deploy_loot_copy = True

    if input("Deploy Loot Portal? y/[N]: ").lower() != "y":
        return

    inbox_address = accounts.at(get_address("Arbitrum Inbox Address: "), force=True)
    if deploy_loot_copy != True:
        loot_address = accounts.at(
            get_address("Loot Address: (can be set later)"), force=True
        )
    l2_minter = accounts.at(
        get_address("L2 Minter address (can be set later): "), force=True
    )
    publish_source = click.confirm("Verify source on etherscan?")
    if deploy_loot_copy:
        loot_address = Loot.deploy({"from": dev}, publish_source=True)
    loot_portal = LootPortal.deploy(
        loot_address,
        inbox_address,
        l2_minter,
        {"from": dev},
        # DEV NOTE: this is not working with etherscan for some reason
        publish_source=publish_source,
    )
