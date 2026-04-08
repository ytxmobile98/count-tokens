import { Tiktoken, encodingForModel, TiktokenModel } from "js-tiktoken";

export { TiktokenModel } from "js-tiktoken";

export function getEncoding(model: TiktokenModel): Tiktoken {
    return encodingForModel(model);
}
