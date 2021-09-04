import pytest
from brownie import config
from brownie import Contract


@pytest.fixture
def arkhamOwner(accounts):
    yield accounts[0]


@pytest.fixture
def lootOwner(accounts):
    lootOwner = accounts.at("0xF296178d553C8Ec21A2fBD2c5dDa8CA9ac905A00", force=True)
    yield lootOwner


@pytest.fixture
def loot():
    token_address = "0xff9c1b15b16263c61d017ee9f65c50e4ae0113d7"
    yield Contract(token_address)


@pytest.fixture
def mirrorLoot(arkhamOwner, MirrorLoot):
    yield arkhamOwner.deploy(MirrorLoot)


@pytest.fixture
def L2Minter(arkhamOwner, ArkhamLootL2Minter, arkhamLoot):
    l2_minter = arkhamOwner.deploy(ArkhamLootL2Minter, arkhamLoot, arkhamOwner)
    arkhamLoot.setMinter(l2_minter)
    yield l2_minter


@pytest.fixture
def arkhamLoot(arkhamOwner, ArkhamLoot, mirrorLoot):
    yield arkhamOwner.deploy(ArkhamLoot, arkhamOwner, mirrorLoot)


@pytest.fixture(scope="session")
def RELATIVE_APPROX():
    yield 1e-5
