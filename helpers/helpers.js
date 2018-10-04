/* eslint-disable */
import axios from "axios";

export const GetLengthArrayWithCondition = (arr, field, value) => {
  var res = 0;
  arr.forEach(x => {
    if (x[field] === value) {
      res++;
    }
  });

  return res;
}

export const GET_COUNTRY_LIST =  () => {
  var res = [];
  axios.get(COUNTRY_API).then(response => {
      response.data.forEach(x => {
          res.push(x.name + ' ' + x.alpha2Code)
      })
  })
  return res
}

const COUNTRY_API = "https://restcountries.eu/rest/v2/all";


export const OBFUSCATE_CREDITCARD = (str) => {
  return 'xxxx - xxxx - xxxx - x' + str.substring(13,16)
}

export const TRANSFORM_DATA = (data) => {
  var res = {}

  for (let i in data) {
    res[i] = data[i]
  }

  return res
}