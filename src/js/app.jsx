import React from 'react';

export default class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      balance: "",
      rate: "",
      term: "15",
      output: ""
    }
   
    this.changeHandler = this.changeHandler.bind(this);
    this.calculate = this.calculate.bind(this);
  }

  changeHandler(props) {
    const name = props.target.name;
    const value = props.target.value;
    this.setState({
        [name]: value
    });
  }

  calculate(balance, rate, term){
    balance = this.state.balance; //works
    rate = ((this.state.rate) / 100) / 12; //works
    term = (this.state.term) * 12; //works

    let tmp = (1 + rate);//works
    let tmp2 = Math.pow(tmp, term);//works
    let top = rate * tmp2;
    let bottom = tmp2 - 1;
    let monthlyPayment = balance * (top/bottom);
    console.log(monthlyPayment);

    this.setState({
      output: monthlyPayment.toFixed(2) + ' is your payment.'
    });

    if(isNaN(monthlyPayment)){
      alert('Please enter number values for both Loan Balance and Interest Rate.')
    }
    else{
      console.log('Payment calculated')
    };

    return monthlyPayment.toFixed(2);
  }


  render() {
    return (
      <div className='container form-horizontal'>
          <div className='form-group'>
            <div className='col-sm-offset-2 col-sm-6'><h3>Mortgage Calculator</h3></div>
          </div>  

          <div className="form-group">
            <label for="loanBalance" className="col-sm-2 control-label">Loan Balance</label>
            <div className="col-sm-6">
              <input className="form-control" onChange={this.changeHandler} name="balance" type="number" value={this.state.balance} placeholder="0" />
            </div> 
          </div>

          <div className="form-group">
            <label for="APR" className="col-sm-2 control-label">Interest Rate (%)</label>
            <div className="col-sm-6">
              <input className="form-control" onChange={this.changeHandler} name="rate" type="number" value={this.state.rate} step="0.01" placeholder="0"/>
            </div>
          </div>

          <div className="form-group">
            <label for="Loan Terms" className="col-sm-2 control-label">Loan Terms (yrs)</label>
            <div className="col-sm-6">
              <select className="form-control" onChange={this.changeHandler} name="term" value={this.state.term}>
                <option value="15">15 yrs</option>
                <option value="30">30 yrs</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
            <button className="btn btn-success" onClick={this.calculate} name="submit">Calculate</button>
            </div>
          </div>

          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <div id="output" onChange={this.changeHandler} name="output" value={this.state.output}><h4>{this.state.output}</h4></div>
            </div>
          </div>

      </div>
    );
  }
}
