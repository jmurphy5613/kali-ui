import { useState, useContext, useEffect } from "react";
import Router, { useRouter } from "next/router";
import AppContext from "../../context/AppContext";
import { Input, Button, Select, Text, Textarea, Stack } from "@chakra-ui/react";
import NumInputField from "../elements/NumInputField";

export default function BuyCrowdsale() {
  const value = useContext(AppContext);
  const {
    web3,
    loading,
    account,
    isMember,
    chainId,
    extensions,
    address,
    abi,
    dao,
  } = value.state;

  const resolveAddressAndEns = async (ens) => {
    let address

    if (ens.slice(-4) === ".eth") {
      address = await web3.eth.ens.getAddress(ens).catch(() => {
        value.toast(ens + " is not a valid ENS.")
      })
    } else if (web3.utils.isAddress(ens) == false) {
      value.toast(ens + " is not a valid Ethereum address.")
      return
    } else {
      address = ens
    }

    if (ens === undefined) {
      return
    }

    return address
  }

  const submitProposal = async (event) => {
    event.preventDefault();
    value.setLoading(true);

    try {
      let object = event.target;
      var array = [];
      for (let i = 0; i < object.length; i++) {
        array[object[i].name] = object[i].value;
      }

      var {
        description_,
        account_,
        amount_,
        proposalType_,
        asset_,
        assetAmount_,
      } = array; // this must contain any inputs from custom forms

      const payload_ = Array(0);

      const tribAbi = require("../../abi/KaliDAOtribute.json");

      const tribAddress = dao["extensions"]["tribute"]["address"];

      const instance = new web3.eth.Contract(tribAbi, tribAddress);

      account_ = await resolveAddressAndEns(account_)
      console.log(account_)

      amount_ = web3.utils.toWei(amount_);

      assetAmount_ = web3.utils.toWei(assetAmount_);

      asset_ = "0x0000000000000000000000000000000000000000";

      const nft = "false";

      // try {
      //   let result = await instance.methods
      //     .submitTributeProposal(
      //       address,
      //       proposalType_,
      //       description_,
      //       [account_],
      //       [amount_],
      //       [payload_],
      //       nft,
      //       asset_,
      //       assetAmount_
      //     )
      //     .send({ from: account, value: assetAmount_ });
      //   value.setVisibleView(1);
      // } catch (e) {
      //   value.toast(e);
      //   value.setLoading(false);
      // }
    } catch (e) {
      value.toast(e);
      value.setLoading(false);
    }

    value.setLoading(false);
  };

  return (
    <form onSubmit={submitProposal}>
      <Stack>
        <Text>
          <b>Details</b>
          <br />
          Make a tribute for membership
        </Text>

        <Textarea name="description_" size="lg" placeholder="dropdown to pick template or custom, upload to ipfs, then store ipfs hash here" />

        <Text>
          <b>Recipient</b>
          <br/>
          Taking talents to [NAME], along with
        </Text>
        <Input name="account_" size="lg" placeholder="0x or .eth"></Input>

        <Text>
          <b>Shares</b>
          <br />
          Asking for [NUMBER] shares: 
        </Text>
        <NumInputField name="amount_" />

        <Text>
          <b>Tribute (ETH)</b>
          <br/>
          extra bag of ERC20 or ERC721 
        </Text>
        <NumInputField name="assetAmount_" min=".000000000000000001" />

        <Input type="hidden" name="proposalType_" value="0" />

        <Button type="submit">Submit Proposal</Button>
      </Stack>
    </form>
  );
}
