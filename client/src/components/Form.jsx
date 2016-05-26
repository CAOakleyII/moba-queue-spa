import { Component } from 'react';

export default class Form extends Component{
  constructor(props) {
    super(props);
  }
  serialize(form){
    // serialize form
    var data = {};
    var inputs = [].slice.call(form.getElementsByTagName('input'));
    inputs.forEach(input => {
      if (input.getAttribute('data-type') === "array") {
        if (!data[input.name]) {
          data[input.name] = [];
        }
        var role = {};
        if(input.checked) {
          data[input.name].push(input.value);
        }
      }
      else if (input.getAttribute('data-type') === "radio") {
        if(input.checked){
          data[input.name] = input.value;
        }
      }
      else {
        data[input.name] = input.value;
      }
    });

    return data;
  }
}
