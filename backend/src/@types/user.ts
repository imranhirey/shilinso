import { Wallet } from "../models/@types.local";
import { SignupFields } from "./auth";

export interface Usertype extends SignupFields{
  security:object,
  wallet:Wallet

}