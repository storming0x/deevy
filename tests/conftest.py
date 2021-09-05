import pytest
from brownie import config
from brownie import Contract


@pytest.fixture
def deevyOwner(accounts):
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
def mirrorLoot(deevyOwner, MirrorLoot):
    yield deevyOwner.deploy(MirrorLoot)


@pytest.fixture
def L2Minter(deevyOwner, DeevyMinter, deevy):
    l2_minter = deevyOwner.deploy(DeevyMinter, deevy, deevyOwner)
    deevy.setMinter(l2_minter)
    yield l2_minter


@pytest.fixture
def deevy(deevyOwner, Deevy, mirrorLoot):
    yield deevyOwner.deploy(Deevy, deevyOwner, mirrorLoot)


@pytest.fixture(scope="session")
def RELATIVE_APPROX():
    yield 1e-5
