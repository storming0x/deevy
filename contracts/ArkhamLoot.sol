// SPDX-License-Identifier: MIT

pragma solidity 0.6.12;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import "./tokens/ERC721.sol";
import {
    ReentrancyGuard
} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import {Base64} from "./libs/Base64.sol";
import {IArkhamLoot} from "./IArkhamLoot.sol";
import {ILoot} from "./ILoot.sol";

// "That is not dead which can eternal lie, And with strange aeons even death may die."

contract ArkhamLoot is ERC721, ReentrancyGuard, Ownable, IArkhamLoot {
    // 18 original loot weapons
    string[] private armament = [
        ".18 Derringer",
        ".32 Colt",
        ".45 Thompson",
        "Ancient Staff",
        "Athame",
        "Baseball Bat",
        "Brass Knuckles",
        "Bullwhip",
        "Carbine Rifle",
        "Cavalry Saber",
        "Chainsaw",
        "Chicago Typewriter",
        "Crowbar",
        "Dynamite",
        "Elephant Gun",
        "Enchanted Blade",
        "Enchanted Knife",
        "Fire Axe",
        "Flamethrower",
        "GraveDigger's Shovel",
        "Golden Sword",
        "Holy Water",
        "Kerosene",
        "Knife",
        "M1918 Bar",
        "Machete",
        "Mauser C96",
        "Old Hunting Rifle",
        "Ornate Bow",
        "Ritual Blade",
        "Sawed-off Shotgun",
        "Shotgun",
        "Survival Knife",
        "Switchblade",
        "Sword of Glory",
        "Tommy Gun"
    ];

    string[] private body = [
        "Arcane Armor",
        "Bulletproof Vest",
        "Enchanted Duster Leather Jacket",
        "Hard Leather Jacket",
        "Trench Coat",
        "Robe",
        "Shirt",
        "Uniform"
    ];

    string[] private items = [
        "Ancient Tome",
        "Archaic Glyphs",
        "Book of Shadows",
        "Crystal Decorated Skull",
        "Crystal Pendulum",
        "Elder Sign Amulet",
        "Flashlight",
        "Gristly Totem",
        "Hallowed Mirror",
        "Holy Rosary",
        "Lantern",
        "Lockpicks",
        "Lucky Penny",
        "Necronomicon Translation",
        "Rabbit's Foot",
        "Ritual Candles",
        "Skeleton Key"
    ];

    string[] private relics = [
        "Ancient Stone Statuette",
        "Codex of Ages",
        "Cultist Manuscripts",
        "Forbidden Tome",
        "Gold Pocket Watch",
        "Hemispheric Map",
        "Jewel of Aureolus",
        "Ocarina",
        "Otherworldly Compass",
        "Red Clock",
        "Royal Pendant",
        "Tooth of Eztli"
    ];

    string[] private talents = [
        "Adaptable",
        "Analytical Mind",
        "Ancestral Knowledge",
        "Arcane Research",
        "Charisma",
        "Deja Vu",
        "High Roller",
        "Hyperawareness",
        "Keen Eye",
        "Lone Wolf",
        "Physical Training",
        "Plucky",
        "Relentless",
        "Scavenging",
        "Scrapper",
        "Sharpshooter",
        "Stealth",
        "Streetwise",
        "Versatile"
    ];

    string[] private weakness = [
        "Amnesia",
        "Atychiphobia",
        "Blodlust",
        "Buried Secrets",
        "Call of the Unknown",
        "Chronophobia",
        "Crisis of Faith",
        "Dark Memory",
        "Dark Pact",
        "Detached from Reality",
        "Dread Curse",
        "Dreams of the Deep",
        "Greed",
        "Haunted",
        "Indebted",
        "Kleptomania",
        "Narcolepsy",
        "Nihilism",
        "Obsessive",
        "Paranoia",
        "Psychosis",
        "Reckless",
        "Self-Destructive",
        "Siren Call",
        "Terrible Secret",
        "Wracked by Nightmares"
    ];

    string[] private classes = [
        "Protector",
        "Mystical",
        "Rogue",
        "Survivor",
        "Searcher"
    ];

    string[] private allies = [
        "Arcane Initiate"
        "Archaelogist",
        "Aspiring Actor",
        "Augur",
        "Black Cat",
        "Cat Burglar",
        "Coast Guard Captain",
        "Concerned Brother",
        "Eldritch Sophist",
        "Fed Agent",
        "Fixer for Hire",
        "Freelance Detective",
        "Guard Dog",
        "Guiding Spirit",
        "Hunter",
        "Laboratory Assistant",
        "Loyal Hound",
        "Museum Curator",
        "Research Librarian",
        "Speaker to the Dead",
        "Unscrupulous Investor"
    ];

    string[] private suffixes = [
        "of Power",
        "of Ancient Ones",
        "of Elder Gods",
        "of Skill",
        "of Perfection",
        "of Brilliance",
        "of Enlightenment",
        "of Protection",
        "of Anger",
        "of Rage",
        "of Fury",
        "of Vitriol",
        "of the Fox",
        "of Detection",
        "of Reflection",
        "of the Twins"
    ];

    string[] private namePrefixes = [
        "Agony",
        "Apocalypse",
        "Armageddon",
        "Beast",
        "Behemoth",
        "Blight",
        "Blood",
        "Bramble",
        "Brimstone",
        "Brood",
        "Carrion",
        "Cataclysm",
        "Chimeric",
        "Corpse",
        "Corruption",
        "Damnation",
        "Death",
        "Demon",
        "Dire",
        "Dragon",
        "Dread",
        "Doom",
        "Dusk",
        "Eagle",
        "Empyrean",
        "Fate",
        "Foe",
        "Gale",
        "Ghoul",
        "Gloom",
        "Glyph",
        "Golem",
        "Grim",
        "Hate",
        "Havoc",
        "Honour",
        "Horror",
        "Hypnotic",
        "Kraken",
        "Loath",
        "Maelstrom",
        "Mind",
        "Miracle",
        "Morbid",
        "Oblivion",
        "Onslaught",
        "Pain",
        "Pandemonium",
        "Phoenix",
        "Plague",
        "Rage",
        "Rapture",
        "Rune",
        "Skull",
        "Sol",
        "Soul",
        "Sorrow",
        "Spirit",
        "Storm",
        "Tempest",
        "Torment",
        "Vengeance",
        "Victory",
        "Viper",
        "Vortex",
        "Woe",
        "Wrath",
        "Light's",
        "Shimmering"
    ];

    string[] private nameSuffixes = [
        "Bane",
        "Root",
        "Bite",
        "Song",
        "Roar",
        "Grasp",
        "Instrument",
        "Glow",
        "Bender",
        "Shadow",
        "Whisper",
        "Shout",
        "Growl",
        "Tear",
        "Peak",
        "Form",
        "Sun",
        "Moon"
    ];

    address public minter;
    // reference readonly copy of Loot contract in L2
    address public loot;

    uint256 public LOOT_SUPPLY = 7779;

    constructor(address minterAddress, address warpedLoot)
        public
        ERC721("Arkham Loot", "ALOOT")
        Ownable()
    {
        minter = minterAddress;
        loot = warpedLoot;
    }

    function setMinter(address newMinterAddress) external onlyOwner {
        minter = newMinterAddress;
    }

    function random(string memory input) internal pure returns (uint256) {
        return uint256(keccak256(abi.encodePacked(input)));
    }

    // Arkham Loot additional properties

    function getArmament(uint256 tokenId) public view returns (string memory) {
        return pluck(tokenId, "ARMAMENT", armament);
    }

    function getBody(uint256 tokenId) public view returns (string memory) {
        return pluck(tokenId, "BODY", body);
    }

    function getItem(uint256 tokenId) public view returns (string memory) {
        return pluck(tokenId, "ITEM", items);
    }

    function getRelic(uint256 tokenId) public view returns (string memory) {
        return pluck(tokenId, "RELIC", relics);
    }

    function getTalent(uint256 tokenId) public view returns (string memory) {
        return pluck(tokenId, "TALENT", talents);
    }

    function getWeakness(uint256 tokenId) public view returns (string memory) {
        return pluck(tokenId, "WEAKNESS", weakness);
    }

    function getAlly(uint256 tokenId) public view returns (string memory) {
        return pluck(tokenId, "ALLY", allies);
    }

    function getClass(uint256 tokenId) public view returns (string memory) {
        return pluck(tokenId, "CLASS", classes);
    }

    function pluck(
        uint256 tokenId,
        string memory keyPrefix,
        string[] memory sourceArray
    ) internal view returns (string memory) {
        uint256 rand =
            random(string(abi.encodePacked(keyPrefix, toString(tokenId))));
        string memory output = sourceArray[rand % sourceArray.length];
        uint256 greatness = rand % 21;
        if (greatness > 14) {
            output = string(
                abi.encodePacked(output, " ", suffixes[rand % suffixes.length])
            );
        }
        if (greatness >= 19) {
            string[2] memory name;
            name[0] = namePrefixes[rand % namePrefixes.length];
            name[1] = nameSuffixes[rand % nameSuffixes.length];
            if (greatness == 19) {
                output = string(
                    abi.encodePacked('"', name[0], " ", name[1], '" ', output)
                );
            } else {
                output = string(
                    abi.encodePacked(
                        '"',
                        name[0],
                        " ",
                        name[1],
                        '" ',
                        output,
                        " +1"
                    )
                );
            }
        }
        return output;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override
        returns (string memory)
    {
        string[17] memory parts;
        parts[
            0
        ] = '<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 350 350"><style>.base { fill: white; font-family: serif; font-size: 14px; }</style><rect width="100%" height="100%" fill="black" /><text x="10" y="20" class="base">';

        parts[1] = getArmament(tokenId);

        parts[2] = '</text><text x="10" y="40" class="base">';

        parts[3] = getBody(tokenId);

        parts[4] = '</text><text x="10" y="60" class="base">';

        parts[5] = getItem(tokenId);

        parts[6] = '</text><text x="10" y="80" class="base">';

        parts[7] = getRelic(tokenId);

        parts[8] = '</text><text x="10" y="100" class="base">';

        parts[9] = getTalent(tokenId);

        parts[10] = '</text><text x="10" y="120" class="base">';

        parts[11] = getWeakness(tokenId);

        parts[12] = '</text><text x="10" y="140" class="base">';

        parts[13] = getAlly(tokenId);

        parts[14] = '</text><text x="10" y="160" class="base">';

        parts[15] = getClass(tokenId);

        parts[16] = "</text></svg>";

        string memory output =
            string(
                abi.encodePacked(
                    parts[0],
                    parts[1],
                    parts[2],
                    parts[3],
                    parts[4],
                    parts[5],
                    parts[6],
                    parts[7],
                    parts[8]
                )
            );
        output = string(
            abi.encodePacked(
                output,
                parts[9],
                parts[10],
                parts[11],
                parts[12],
                parts[13],
                parts[14],
                parts[15],
                parts[16]
            )
        );

        string memory json =
            Base64.encode(
                bytes(
                    string(
                        abi.encodePacked(
                            '{"name": "Bag #',
                            toString(tokenId),
                            '", "description": "Arkham Loot is randomized adventurer gear generated and stored on chain. Stats, images, and other functionality are intentionally omitted for others to interpret. Feel free to use Arkham Loot in any way you want.", "image": "data:image/svg+xml;base64,',
                            Base64.encode(bytes(output)),
                            '"}'
                        )
                    )
                )
            );
        output = string(
            abi.encodePacked("data:application/json;base64,", json)
        );

        return output;
    }

    function warpLoot(address account, uint256 tokenId)
        external
        override
        nonReentrant
    {
        require(minter == msg.sender, "SENDER_ISNT_MINTER");
        // TODO Check token id ranges.
        require(tokenId > 0 && tokenId < 8000, "Token ID invalid");
        _safeMint(account, tokenId);
    }

    function ownerClaim(uint256 tokenId)
        public
        override
        nonReentrant
        onlyOwner
    {
        require(tokenId > 8000 && tokenId < 8100, "Token ID invalid");
        _safeMint(owner(), tokenId);
    }

    function claim(address account, uint256 tokenId)
        external
        override
        nonReentrant
    {
        require(minter == msg.sender, "SENDER_ISNT_MINTER");
        _safeMint(account, tokenId);
    }

    function toString(uint256 value) internal pure returns (string memory) {
        // Inspired by OraclizeAPI's implementation - MIT license
        // https://github.com/oraclize/ethereum-api/blob/b42146b063c7d6ee1358846c198246239e9360e8/oraclizeAPI_0.4.25.sol

        if (value == 0) {
            return "0";
        }
        uint256 temp = value;
        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
            value /= 10;
        }
        return string(buffer);
    }

    // Loot compatibility functions

    function getWeapon(uint256 tokenId) public view returns (string memory) {
        if (tokenId > LOOT_SUPPLY) return "";
        return ILoot(loot).getWeapon(tokenId);
    }

    function getChest(uint256 tokenId) public view returns (string memory) {
        if (tokenId > LOOT_SUPPLY) return "";
        return ILoot(loot).getChest(tokenId);
    }

    function getHead(uint256 tokenId) public view returns (string memory) {
        if (tokenId > LOOT_SUPPLY) return "";
        return ILoot(loot).getHead(tokenId);
    }

    function getWaist(uint256 tokenId) public view returns (string memory) {
        if (tokenId > LOOT_SUPPLY) return "";
        return ILoot(loot).getWaist(tokenId);
    }

    function getFoot(uint256 tokenId) public view returns (string memory) {
        if (tokenId > LOOT_SUPPLY) return "";
        return ILoot(loot).getFoot(tokenId);
    }

    function getHand(uint256 tokenId) public view returns (string memory) {
        if (tokenId > LOOT_SUPPLY) return "";
        return ILoot(loot).getHand(tokenId);
    }

    function getNeck(uint256 tokenId) public view returns (string memory) {
        if (tokenId > LOOT_SUPPLY) return "";
        return ILoot(loot).getNeck(tokenId);
    }

    function getRing(uint256 tokenId) public view returns (string memory) {
        if (tokenId > LOOT_SUPPLY) return "";
        return ILoot(loot).getRing(tokenId);
    }

    function lootTokenURI(uint256 tokenId) public view returns (string memory) {
        if (tokenId > LOOT_SUPPLY) return "";
        return ILoot(loot).tokenUri(tokenId);
    }
}
