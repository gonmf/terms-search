import $ from "jquery";
import fetch from "isomorphic-unfetch"
import React, { Component } from "react"
import TrendChart from "../components/TrendChart";

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      busy: false,
      terms: []
    };

    this.formSubmit = this.formSubmit.bind(this);
  }

  formSubmit(e) {
    e.preventDefault();

    if (this.state.busy) {
      return;
    }

    const newTerm = $("[name='search-term'").val();
    let newTerms = this.state.terms;

    if (!newTerm) {
      return;
    }

    $("[name='search-term'").val("");

    if (newTerms.find(term => term.text === newTerm)) {
      this.setState({ errorMsg: "Term has already been searched for." });
      return;
    }

    // Only allow 10 terms at once
    newTerms = [{ id: Date.now(), text: newTerm }].concat(newTerms).slice(0, 10);

    this.setState({
      busy: true,
      terms: newTerms,
      errorMsg: null
    });

    const url = `/api/terms?term=${newTerm}`;

    fetch(url).then(r => r.json())
              .then(function(data) {
                const newTerms = this.state.terms,
                      term = newTerms.find(term => term.text === newTerm);

                if (term.err) {
                  this.setState({
                    busy: false,
                    errorMsg: term.err
                  });
                } else{
                  term.data = data.default.timelineData;

                  this.setState({
                    busy: false,
                    terms: newTerms
                  });
                }
              }.bind(this));
  }

  render() {
    const { errorMsg, terms, busy } = this.state;

    return (
      <main>
        {errorMsg && <p>Error: {errorMsg}</p>}
        <h1>Term search</h1>

        <form className="contact-form" onSubmit={ (e) => this.formSubmit(e)}>
          <input name="search-term" className="search-term" type="text" placeholder="New search term" disabled={busy} />

          <button type="submit" className="search-term">Add</button>
        </form>

        {terms.map(term => <div key={term.id}>
          <h2>{term.text}</h2>

          {term.data ? <TrendChart trendData={term.data} /> : "Loading..."}
        </div>)}

        <style jsx>{`
          main {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            width: 90%;
            max-width: 600px;
            margin: 60px auto;
          }
          label {
            display: block;
          }
          .search-term {
            font-size: large;
          }
        `}</style>
      </main>
    );
  }
}
