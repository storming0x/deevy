from pathlib import Path

from brownie import (
    ArkhamLoot,
    ArkhamLootL2Minter,
    MirrorLoot,
    accounts,
    config,
    network,
    project,
    web3,
)
from eth_utils import is_checksum_address
import click


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

    if input("Deploy Arkham Loot L2 Contracts? y/[N]: ").lower() != "y":
        return

    arkham_portal_layer1 = accounts.at(
        get_address("Arkham Portal Layer 1 address: "), force=True
    )
    publish_source = click.confirm("Verify source on etherscan?")
    loot_mirror = MirrorLoot.deploy({"from": dev}, publish_source=publish_source)
    arkham_loot = ArkhamLoot.deploy(
        loot_mirror, loot_mirror, {"from": dev}, publish_source=publish_source
    )
    arkham_minter = ArkhamLootL2Minter.deploy(
        arkham_loot,
        arkham_portal_layer1,
        {"from": dev},
        publish_source=publish_source,
    )
    arkham_loot.setMinter(arkham_minter, {"from": dev})
