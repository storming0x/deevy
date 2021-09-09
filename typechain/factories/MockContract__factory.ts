/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import type { MockContract } from "../MockContract";

export class MockContract__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(overrides?: Overrides): Promise<MockContract> {
    return super.deploy(overrides || {}) as Promise<MockContract>;
  }
  getDeployTransaction(overrides?: Overrides): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): MockContract {
    return super.attach(address) as MockContract;
  }
  connect(signer: Signer): MockContract__factory {
    return super.connect(signer) as MockContract__factory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): MockContract {
    return new Contract(address, _abi, signerOrProvider) as MockContract;
  }
}

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    stateMutability: "payable",
    type: "fallback",
  },
  {
    inputs: [],
    name: "DEFAULT_FALLBACK_VALUE",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MOCKS_LIST_END",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MOCKS_LIST_END_HASH",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MOCKS_LIST_START",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "SENTINEL_ANY_MOCKS",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "response",
        type: "bytes",
      },
    ],
    name: "givenAnyReturn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "response",
        type: "address",
      },
    ],
    name: "givenAnyReturnAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "response",
        type: "bool",
      },
    ],
    name: "givenAnyReturnBool",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "response",
        type: "uint256",
      },
    ],
    name: "givenAnyReturnUint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "givenAnyRevert",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "message",
        type: "string",
      },
    ],
    name: "givenAnyRevertWithMessage",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "givenAnyRunOutOfGas",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "call",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "response",
        type: "bytes",
      },
    ],
    name: "givenCalldataReturn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "call",
        type: "bytes",
      },
      {
        internalType: "address",
        name: "response",
        type: "address",
      },
    ],
    name: "givenCalldataReturnAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "call",
        type: "bytes",
      },
      {
        internalType: "bool",
        name: "response",
        type: "bool",
      },
    ],
    name: "givenCalldataReturnBool",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "call",
        type: "bytes",
      },
      {
        internalType: "uint256",
        name: "response",
        type: "uint256",
      },
    ],
    name: "givenCalldataReturnUint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "call",
        type: "bytes",
      },
    ],
    name: "givenCalldataRevert",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "call",
        type: "bytes",
      },
      {
        internalType: "string",
        name: "message",
        type: "string",
      },
    ],
    name: "givenCalldataRevertWithMessage",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "call",
        type: "bytes",
      },
    ],
    name: "givenCalldataRunOutOfGas",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "call",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "response",
        type: "bytes",
      },
    ],
    name: "givenMethodReturn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "call",
        type: "bytes",
      },
      {
        internalType: "address",
        name: "response",
        type: "address",
      },
    ],
    name: "givenMethodReturnAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "call",
        type: "bytes",
      },
      {
        internalType: "bool",
        name: "response",
        type: "bool",
      },
    ],
    name: "givenMethodReturnBool",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "call",
        type: "bytes",
      },
      {
        internalType: "uint256",
        name: "response",
        type: "uint256",
      },
    ],
    name: "givenMethodReturnUint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "call",
        type: "bytes",
      },
    ],
    name: "givenMethodRevert",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "call",
        type: "bytes",
      },
      {
        internalType: "string",
        name: "message",
        type: "string",
      },
    ],
    name: "givenMethodRevertWithMessage",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "call",
        type: "bytes",
      },
    ],
    name: "givenMethodRunOutOfGas",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "invocationCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "call",
        type: "bytes",
      },
    ],
    name: "invocationCountForCalldata",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "call",
        type: "bytes",
      },
    ],
    name: "invocationCountForMethod",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "reset",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "methodId",
        type: "bytes4",
      },
      {
        internalType: "bytes",
        name: "originalMsgData",
        type: "bytes",
      },
    ],
    name: "updateInvocationCount",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x600060a09081526020608081905260c06040526200002091600b91620000ce565b503480156200002e57600080fd5b50604080518082019091526004815263183c333360e11b6020808301918252600160f81b60009081529052905162000088917f82ac279db26a206d9ba5a94c07ff940aea4b3bfde8820ec95f4efa0acfd0d5bc91620000ce565b50600160f81b60005260056020527fde001afd1f75281f9d2ab22d4e0166be5a51dd890d7492e8fbf3e412e05eac0a805463ffffffff191663010000001790556200016a565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106200011157805160ff191683800117855562000141565b8280016001018555821562000141579182015b828111156200014157825182559160200191906001019062000124565b506200014f92915062000153565b5090565b5b808211156200014f576000815560010162000154565b612867806200017a6000396000f3fe6080604052600436106101d85760003560e01c80637cd96ee411610102578063cf11ff5d11610095578063e211b8a511610064578063e211b8a51461132b578063eb861f6914611340578063f07da229146113bb578063f5afa9c1146113ed576101d8565b8063cf11ff5d1461119c578063d6fe977814611220578063d73ca0ac1461129b578063d826f88f14611316576101d8565b8063aa788c55116100d1578063aa788c5514610fa8578063af21ac7814611023578063b3901f291461104d578063c6ee167f146110d1576101d8565b80637cd96ee414610d8257806387abab6514610d975780639a1dc86b14610e125780639eaeed7514610edd576101d8565b8063586984a41161017a57806367aad04a1161014957806367aad04a14610c42578063682b479714610c5757806368ab6f2f14610c8a5780636f40075614610d05576101d8565b8063586984a4146109bd57806358cbc02514610a385780635a3855ab14610afa5780636193659414610b77576101d8565b80632ed238dc116101b65780632ed238dc146108ec57806336ff0ee5146109015780633956dc6b1461092d5780634937c4f614610942576101d8565b80630a20119f146107be578063122aea81146107e557806321fed4d61461086f575b60003560018060003660405180838380828437919091019485525050604051928390036020019092205460ff16915050600281111561021357fe5b14156102d5576003600036604051808383808284379190910194855250506040516020938190038401812062461bcd60e51b8252600482019485528054600260018216156101000260001901909116046024830181905290949350839250604490910190849080156102c65780601f1061029b576101008083540402835291602001916102c6565b820191906000526020600020905b8154815290600101906020018083116102a957829003601f168201915b50509250505060405180910390fd5b6002600160003660405180838380828437919091019485525050604051928390036020019092205460ff16915050600281111561030e57fe5b141561031c5761031c611468565b60606002600036604051808383808284379190910194855250506040805160209481900385018120805460026001821615610100026000190190911604601f810187900487028301870190935282825290949093509091508301828280156103c55780601f1061039a576101008083540402835291602001916103c5565b820191906000526020600020905b8154815290600101906020018083116103a857829003601f168201915b505050505090508051600014156105595760016001600160e01b0319831660009081526006602052604090205460ff16600281111561040057fe5b141561047b576001600160e01b03198216600090815260086020908152604091829020915162461bcd60e51b81526004810191825282546002600019610100600184161502019091160460248201819052829160440190849080156102c65780601f1061029b576101008083540402835291602001916102c6565b60026001600160e01b0319831660009081526006602052604090205460ff1660028111156104a557fe5b14156104b3576104b3611468565b6001600160e01b0319821660009081526007602090815260409182902080548351601f6002600019610100600186161502019093169290920491820184900484028101840190945280845290918301828280156105515780601f1061052657610100808354040283529160200191610551565b820191906000526020600020905b81548152906001019060200180831161053457829003601f168201915b505050505090505b8051610688576001600a5460ff16600281111561057257fe5b14156105d95760405162461bcd60e51b8152602060048201908152600c8054600260001961010060018416150201909116046024840181905290928291604490910190849080156102c65780601f1061029b576101008083540402835291602001916102c6565b6002600a5460ff1660028111156105ec57fe5b14156105fa576105fa611468565b600b805460408051602060026001851615610100026000190190941693909304601f810184900484028201840190925281815292918301828280156106805780601f1061065557610100808354040283529160200191610680565b820191906000526020600020905b81548152906001019060200180831161066357829003601f168201915b505050505090505b6060306001600160a01b0316620186a08460003660405160240180846001600160e01b031916815260200180602001828103825284848281815260200192508082843760008382015260408051601f909201601f1990811690940182810390940182529283526020810180516001600160e01b03166358cbc02560e01b17815292518151919850965086955091935090915081905083835b6020831061073f5780518252601f199092019160209182019101610720565b6001836020036101000a03801982511681845116808217855250505050505090500191505060006040518083038160008787f1925050503d80600081146107a2576040519150601f19603f3d011682016040523d82523d6000602084013e6107a7565b606091505b5091505080516000146107b657fe5b815182602001f35b3480156107ca57600080fd5b506107d3611484565b60408051918252519081900360200190f35b3480156107f157600080fd5b506107fa61148a565b6040805160208082528351818301528351919283929083019185019080838360005b8381101561083457818101518382015260200161081c565b50505050905090810190601f1680156108615780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561087b57600080fd5b506108ea6004803603602081101561089257600080fd5b810190602081018135600160201b8111156108ac57600080fd5b8201836020820111156108be57600080fd5b803590602001918460018302840111600160201b831117156108df57600080fd5b5090925090506114b0565b005b3480156108f857600080fd5b506107d3611537565b34801561090d57600080fd5b506108ea6004803603602081101561092457600080fd5b50351515611577565b34801561093957600080fd5b506108ea61159e565b34801561094e57600080fd5b506107d36004803603602081101561096557600080fd5b810190602081018135600160201b81111561097f57600080fd5b82018360208201111561099157600080fd5b803590602001918460018302840111600160201b831117156109b257600080fd5b5090925090506115ad565b3480156109c957600080fd5b506107d3600480360360208110156109e057600080fd5b810190602081018135600160201b8111156109fa57600080fd5b820183602082011115610a0c57600080fd5b803590602001918460018302840111600160201b83111715610a2d57600080fd5b50909250905061163e565b348015610a4457600080fd5b506108ea60048036036040811015610a5b57600080fd5b6001600160e01b03198235169190810190604081016020820135600160201b811115610a8657600080fd5b820183602082011115610a9857600080fd5b803590602001918460018302840111600160201b83111715610ab957600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250929550611695945050505050565b348015610b0657600080fd5b506108ea60048036036040811015610b1d57600080fd5b810190602081018135600160201b811115610b3757600080fd5b820183602082011115610b4957600080fd5b803590602001918460018302840111600160201b83111715610b6a57600080fd5b91935091503515156117c3565b348015610b8357600080fd5b506108ea60048036036040811015610b9a57600080fd5b810190602081018135600160201b811115610bb457600080fd5b820183602082011115610bc657600080fd5b803590602001918460018302840111600160201b83111715610be757600080fd5b919390929091602081019035600160201b811115610c0457600080fd5b820183602082011115610c1657600080fd5b803590602001918460018302840111600160201b83111715610c3757600080fd5b509092509050611829565b348015610c4e57600080fd5b506107d361189c565b348015610c6357600080fd5b506108ea60048036036020811015610c7a57600080fd5b50356001600160a01b03166118a4565b348015610c9657600080fd5b506108ea60048036036020811015610cad57600080fd5b810190602081018135600160201b811115610cc757600080fd5b820183602082011115610cd957600080fd5b803590602001918460018302840111600160201b83111715610cfa57600080fd5b5090925090506118bc565b348015610d1157600080fd5b506108ea60048036036040811015610d2857600080fd5b810190602081018135600160201b811115610d4257600080fd5b820183602082011115610d5457600080fd5b803590602001918460018302840111600160201b83111715610d7557600080fd5b9193509150351515611939565b348015610d8e57600080fd5b506107fa611999565b348015610da357600080fd5b506108ea60048036036020811015610dba57600080fd5b810190602081018135600160201b811115610dd457600080fd5b820183602082011115610de657600080fd5b803590602001918460018302840111600160201b83111715610e0757600080fd5b5090925090506119b9565b348015610e1e57600080fd5b506108ea60048036036040811015610e3557600080fd5b810190602081018135600160201b811115610e4f57600080fd5b820183602082011115610e6157600080fd5b803590602001918460018302840111600160201b83111715610e8257600080fd5b919390929091602081019035600160201b811115610e9f57600080fd5b820183602082011115610eb157600080fd5b803590602001918460018302840111600160201b83111715610ed257600080fd5b5090925090506119d2565b348015610ee957600080fd5b506108ea60048036036040811015610f0057600080fd5b810190602081018135600160201b811115610f1a57600080fd5b820183602082011115610f2c57600080fd5b803590602001918460018302840111600160201b83111715610f4d57600080fd5b919390929091602081019035600160201b811115610f6a57600080fd5b820183602082011115610f7c57600080fd5b803590602001918460018302840111600160201b83111715610f9d57600080fd5b509092509050611a60565b348015610fb457600080fd5b506108ea60048036036020811015610fcb57600080fd5b810190602081018135600160201b811115610fe557600080fd5b820183602082011115610ff757600080fd5b803590602001918460018302840111600160201b8311171561101857600080fd5b509092509050611b19565b34801561102f57600080fd5b506108ea6004803603602081101561104657600080fd5b5035611b86565b34801561105957600080fd5b506108ea6004803603604081101561107057600080fd5b810190602081018135600160201b81111561108a57600080fd5b82018360208201111561109c57600080fd5b803590602001918460018302840111600160201b831117156110bd57600080fd5b9193509150356001600160a01b0316611b92565b3480156110dd57600080fd5b506108ea600480360360408110156110f457600080fd5b810190602081018135600160201b81111561110e57600080fd5b82018360208201111561112057600080fd5b803590602001918460018302840111600160201b8311171561114157600080fd5b919390929091602081019035600160201b81111561115e57600080fd5b82018360208201111561117057600080fd5b803590602001918460018302840111600160201b8311171561119157600080fd5b509092509050611bde565b3480156111a857600080fd5b506108ea600480360360408110156111bf57600080fd5b810190602081018135600160201b8111156111d957600080fd5b8201836020820111156111eb57600080fd5b803590602001918460018302840111600160201b8311171561120c57600080fd5b9193509150356001600160a01b0316611c51565b34801561122c57600080fd5b506108ea6004803603602081101561124357600080fd5b810190602081018135600160201b81111561125d57600080fd5b82018360208201111561126f57600080fd5b803590602001918460018302840111600160201b8311171561129057600080fd5b509092509050611c9d565b3480156112a757600080fd5b506108ea600480360360408110156112be57600080fd5b810190602081018135600160201b8111156112d857600080fd5b8201836020820111156112ea57600080fd5b803590602001918460018302840111600160201b8311171561130b57600080fd5b919350915035611cdc565b34801561132257600080fd5b506108ea611d21565b34801561133757600080fd5b506108ea612232565b34801561134c57600080fd5b506108ea6004803603602081101561136357600080fd5b810190602081018135600160201b81111561137d57600080fd5b82018360208201111561138f57600080fd5b803590602001918460018302840111600160201b831117156113b057600080fd5b50909250905061225d565b3480156113c757600080fd5b506113d061189c565b604080516001600160e01b03199092168252519081900360200190f35b3480156113f957600080fd5b506108ea6004803603604081101561141057600080fd5b810190602081018135600160201b81111561142a57600080fd5b82018360208201111561143c57600080fd5b803590602001918460018302840111600160201b8311171561145d57600080fd5b91935091503561232a565b5b60006060600060c060008060066107d05a03f1905050611469565b600d5490565b600060405160200180821515815260200191505060405160208183030381529060405281565b6002600183836040518083838082843791909101948552505060405192839003602001909220805490925060ff1916905060018360028111156114ef57fe5b021790555061153382828080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061236f92505050565b5050565b604080518082019091526004815263183c333360e11b6020909101527f420daffad4b177bce28bead5f76f7bc97ef63c3aae74c496db8ce6aafe9e651381565b600081611585576000611588565b60015b60ff1690506115336115998261240c565b612436565b600a805460ff19166002179055565b6000806115ef84848080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061245392505050565b600e54604080516020808201939093526001600160e01b031990931683820152805160248185030181526044909301815282519282019290922060009081526009909152205491505092915050565b600060046000600e5485856040516020018084815260200183838082843780830192505050935050505060405160208183030381529060405280519060200120815260200190815260200160002054905092915050565b3330146116d35760405162461bcd60e51b815260040180806020018281038252602b8152602001806127e7602b913960400191505060405180910390fd5b600d80546001908101909155600e8054604080516020808201939093526001600160e01b0319871681830152815160248183030181526044820183528051908401206000908152600984529182208054860190559254606484018181528651600495939492938893608490910191908401908083835b602083106117685780518252601f199092019160209182019101611749565b6001836020036101000a03801982511681845116808217855250505050505090500192505050604051602081830303815290604052805190602001208152602001908152602001600020600082825401925050819055505050565b6000816117d15760006117d4565b60015b60ff16905061182384848080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061181e925085915061240c9050565b612497565b50505050565b61182384848080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525050604080516020601f8801819004810282018101909252868152925086915085908190840183828082843760009201919091525061249792505050565b600160f81b81565b6118b9611599826001600160a01b031661240c565b50565b60006118fd83838080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061245392505050565b6001600160e01b031981166000908152600660205260409020805491925060029160ff19166001835b021790555061193481612592565b505050565b60008161194757600061194a565b60015b60ff16905061182384848080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250611994925085915061240c9050565b61261d565b60405180604001604052806004815260200163183c333360e11b81525081565b600a805460ff19166001179055611934600c8383612670565b6000611a1385858080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061245392505050565b6001600160e01b031981166000908152600660209081526040808320805460ff1916600117905560089091529020909150611a4f908484612670565b50611a5981612592565b5050505050565b60018085856040518083838082843791909101948552505060405192839003602001909220805490925060ff191690506001836002811115611a9e57fe5b021790555081816003868660405180838380828437808301925050509250505090815260200160405180910390209190611ad9929190612670565b5061182384848080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061236f92505050565b6000611b5a83838080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061245392505050565b6001600160e01b031981166000908152600660205260409020805491925060019160ff19168280611926565b6118b96115998261240c565b61193483838080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061181e925050506001600160a01b03841661240c565b61182384848080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525050604080516020601f8801819004810282018101909252868152925086915085908190840183828082843760009201919091525061261d92505050565b61193483838080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250611994925050506001600160a01b03841661240c565b61153382828080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061243692505050565b61193483838080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061181e925085915061240c9050565b600160f81b6000908152602090815260008051602061281283398151915280546040805160026001841615610100026000190190931692909204601f8101859004850283018501909152808252606093919291830182828015611dc55780601f10611d9a57610100808354040283529160200191611dc5565b820191906000526020600020905b815481529060010190602001808311611da857829003601f168201915b5050835160208501209394505050505b604080518082019091526004815263183c333360e11b6020909101527f420daffad4b177bce28bead5f76f7bc97ef63c3aae74c496db8ce6aafe9e6513811461206f5760006001836040518082805190602001908083835b60208310611e4c5780518252601f199092019160209182019101611e2d565b51815160209384036101000a60001901801990921691161790529201948552506040519384900301909220805490925060ff191690506001836002811115611e9057fe5b0217905550604051806020016040528060008152506002836040518082805190602001908083835b60208310611ed75780518252601f199092019160209182019101611eb8565b51815160209384036101000a60001901801990921691161790529201948552506040519384900381019093208451611f1895919491909101925090506126ee565b50604051806020016040528060008152506003836040518082805190602001908083835b60208310611f5b5780518252601f199092019160209182019101611f3c565b51815160209384036101000a60001901801990921691161790529201948552506040519384900381019093208451611f9c95919491909101925090506126ee565b506000818152602081815260409182902080548351601f60026000196101006001861615020190931692909204918201849004840281018401909452808452909183018282801561202e5780601f106120035761010080835404028352916020019161202e565b820191906000526020600020905b81548152906001019060200180831161201157829003601f168201915b505060408051602080820180845260008084528981529182905292902090519597506120619590945090925090506126ee565b505080516020820120611dd5565b604080518082019091526004815263183c333360e11b6020808301918252600160f81b6000908152905290516120b491600080516020612812833981519152916126ee565b50600160f81b60005260056020527fde001afd1f75281f9d2ab22d4e0166be5a51dd890d7492e8fbf3e412e05eac0a5460e01b5b6001600160e01b03198116600160f81b146121a8576001600160e01b031981166000818152600660209081526040808320805460ff19169055805180830180835284825294845260079092529091209051839261214592916126ee565b5060408051602080820180845260008084526001600160e01b0319861681526008909252929020905161217892906126ee565b506001600160e01b0319166000908152600560205260409020805463ffffffff19811690915560e01b90506120e8565b600160f81b6000908152600560209081527fde001afd1f75281f9d2ab22d4e0166be5a51dd890d7492e8fbf3e412e05eac0a805463ffffffff1916630100000017905560408051808301939093528051808403830181529281019052815161221492600b9201906126ee565b5050600a805460ff1916905550506000600d55600e80546001019055565b600a805460ff191660011790556040805160208101918290526000908190526118b991600c916126ee565b60018083836040518083838082843791909101948552505060405192839003602001909220805490925060ff19169050600183600281111561229b57fe5b02179055506040518060200160405280600081525060038383604051808383808284378083019250505092505050908152602001604051809103902090805190602001906122ea9291906126ee565b5061153382828080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061236f92505050565b61193483838080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250611994925085915061240c9050565b80516020808301919091206000818152918290526040909120546002600019610100600184161502019091160461153357600060208190528181526040902060008051602061281283398151915280546123dd9291906002600019610100600184161502019091160461275c565b50600160f81b6000908152602090815282516119349160008051602061281283398151915291908501906126ee565b60408051602080825281830190925260609160208201818036833750505060208101929092525090565b600a805460ff19169055805161153390600b9060208401906126ee565b60008060005b6004811015612490578060080284828151811061247257fe5b01602001516001600160f81b031916901c9190911790600101612459565b5092915050565b60006001836040518082805190602001908083835b602083106124cb5780518252601f1990920191602091820191016124ac565b51815160209384036101000a60001901801990921691161790529201948552506040519384900301909220805490925060ff19169050600183600281111561250f57fe5b0217905550806002836040518082805190602001908083835b602083106125475780518252601f199092019160209182019101612528565b51815160209384036101000a6000190180199092169116179052920194855250604051938490038101909320845161258895919491909101925090506126ee565b506115338261236f565b6001600160e01b031980821660009081526005602052604090205460e01b166118b95760056020527fde001afd1f75281f9d2ab22d4e0166be5a51dd890d7492e8fbf3e412e05eac0a80546001600160e01b03198316600090815260408120805463ffffffff90931663ffffffff19938416179055600160f81b9052815460e084901c911617905550565b600061262883612453565b6001600160e01b031981166000908152600660209081526040808320805460ff191690556007825290912084519293506126669290918501906126ee565b5061193481612592565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106126b15782800160ff198235161785556126de565b828001600101855582156126de579182015b828111156126de5782358255916020019190600101906126c3565b506126ea9291506127d1565b5090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061272f57805160ff19168380011785556126de565b828001600101855582156126de579182015b828111156126de578251825591602001919060010190612741565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061279557805485556126de565b828001600101855582156126de57600052602060002091601f016020900482015b828111156126de5782548255916001019190600101906127b6565b5b808211156126ea57600081556001016127d256fe43616e206f6e6c792062652063616c6c65642066726f6d2074686520636f6e747261637420697473656c6682ac279db26a206d9ba5a94c07ff940aea4b3bfde8820ec95f4efa0acfd0d5bca264697066735822122042282c7be691a134caf9693ebe54268fa936ea7c6f8bd08d2ac2edc61d1e494964736f6c634300060c0033";
