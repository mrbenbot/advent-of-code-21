// https://adventofcode.com/2021/day/16

export function part1(input: string): any {
  const bits = decode(input);
  const packet = new Packet([...bits]);
  return getVersionTotal([packet]);
}

export function part2(input: string): any {
  const bits = decode(input);
  const packet = new Packet([...bits]);
  return evaluate(packet);
}

function getVersionTotal(packets: Packet[]): number {
  return packets.reduce((acc: number, cur) => {
    const subPackets = cur?.subPackets ?? [];
    if (subPackets.length > 0) {
      return acc + cur.version + getVersionTotal(subPackets);
    }
    return acc + cur.version;
  }, 0);
}

function evaluate(packet: Packet): number {
  if (packet.typeId === PacketType.Literal) {
    return packet.value as number;
  }
  const operation = operations[packet.typeId];
  const subPackets = packet.subPackets;
  return operation(...subPackets.map((packet) => evaluate(packet)));
}

function decode(hex: string): string {
  return [...hex].reduce((acc, cur) => {
    return acc + hexToBinaryMap[cur];
  }, "");
}

class Packet {
  version: number;
  typeId: PacketType;
  value?: number | null = null;
  subPackets: Packet[];

  constructor(bits: string[]) {
    this.version = parseInt(bits.splice(0, 3).join(""), 2);
    this.typeId = parseInt(bits.splice(0, 3).join(""), 2);
    this.subPackets = [];
    if (this.typeId === PacketType.Literal) {
      this.parseLiteral(bits);
    } else {
      this.parseOperator(bits);
    }
  }

  parseLiteral(packetBits: string[]) {
    let [first, ...valueChunks] = packetBits.splice(0, 5);
    while (first === "1") {
      const [nextFirst, ...nextValueChunk] = packetBits.splice(0, 5);
      valueChunks.push(...nextValueChunk);
      first = nextFirst;
    }

    this.value = parseInt(valueChunks.join(""), 2);
  }

  parseOperator(bits: string[]) {
    const lengthTypeId = parseInt(bits.splice(0, 1)[0], 10);

    if (lengthTypeId) {
      const numberOfSubPackets = parseInt(bits.splice(0, 11).join(""), 2);

      for (let i = 0; i < numberOfSubPackets; i += 1) {
        this.subPackets.push(new Packet(bits));
      }
    } else {
      const subPacketsLength = parseInt(bits.splice(0, 15).join(""), 2);
      const subPacketBits = bits.splice(0, subPacketsLength);

      while (subPacketBits.length > 0) {
        this.subPackets.push(new Packet(subPacketBits));
      }
    }
  }
}

enum PacketType {
  Sum = 0,
  Product = 1,
  Min = 2,
  Max = 3,
  Literal = 4,
  GreaterThan = 5,
  LessThan = 6,
  EqualTo = 7,
}

const operations: { [key in PacketType]: any } = {
  [PacketType.Sum]: (...args: number[]) => args.reduce((a, b) => a + b, 0),
  [PacketType.Product]: (...args: number[]) => args.reduce((a, b) => a * b, 1),
  [PacketType.Min]: (...args: number[]) => Math.min(...args),
  [PacketType.Max]: (...args: number[]) => Math.max(...args),
  [PacketType.GreaterThan]: (...[a, b]: number[]) => (a > b ? 1 : 0),
  [PacketType.LessThan]: (...[a, b]: number[]) => (a < b ? 1 : 0),
  [PacketType.EqualTo]: (...[a, b]: number[]) => (a === b ? 1 : 0),
  [PacketType.Literal]: (...args: number[]) => args,
};

const hexToBinaryMap: { [key: string]: string } = {
  0: "0000",
  1: "0001",
  2: "0010",
  3: "0011",
  4: "0100",
  5: "0101",
  6: "0110",
  7: "0111",
  8: "1000",
  9: "1001",
  A: "1010",
  B: "1011",
  C: "1100",
  D: "1101",
  E: "1110",
  F: "1111",
};
