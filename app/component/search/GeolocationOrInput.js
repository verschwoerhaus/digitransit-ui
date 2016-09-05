import React, { Component, PropTypes } from 'react';
import GeolocationBar from './GeolocationBar';
import SearchInputContainer from './SearchInputContainer';

export default class GeolocationOrInput extends Component {
  static propTypes = {
    endpoint: PropTypes.shape({
      useCurrentPosition: PropTypes.bool,
      address: PropTypes.string,
    }),
    initialValue: PropTypes.string,
  }

  state = {
    geolocation: false,
  };

  componentWillMount() {
    if (this.props.endpoint != null) {
      this.setStateFromEndpoint(this.props.endpoint);
    }
  }

  setStateFromEndpoint = ({ useCurrentPosition }) =>
    (useCurrentPosition ? this.setState({ geolocation: useCurrentPosition }) : null)

  getInitialValue = () =>
    (this.props.endpoint != null ?
      this.props.endpoint.address || '' : this.props.initialValue)

  render() {
    const child = this.state.geolocation === false ? null :
      <GeolocationBar
        geolocation={{ hasLocation: true }}
        onClick={() => {
          this.setState({ geolocation: false });
          this.searchInput.focus();
        }}
      />;

    return (
      <SearchInputContainer
        ref={(c) => { this.searchInput = c; }}
        initialValue={this.getInitialValue()}
        {...this.props}
      >
        {child}
      </SearchInputContainer>
    );
  }
}
