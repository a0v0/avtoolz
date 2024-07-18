import { MimeType } from "@/libs/mime";
import { expect, test } from "vitest";
import { getWatermarkedFilename } from "./helpers";

interface ITestCase {
  filename: string;
  outputType: MimeType;
  expected: string;
}

test("getWatermarkedFilename should add watermark to the filename", () => {
  const testCases: ITestCase[] = [
    {
      filename: "example.jpg.pdf",
      outputType: "application/pdf",
      expected: "avtoolz_example.jpg.pdf",
    },
    {
      filename: "exampledasdff.jpg.kosd.gosd.ds",
      outputType: "application/pdf",
      expected: "avtoolz_exampledasdff.jpg.kosd.gosd.pdf",
    },
  ];

  testCases.forEach(({ filename, outputType, expected }) => {
    const result = getWatermarkedFilename(filename, outputType);

    expect(result).toBe(expected);
  });
});
