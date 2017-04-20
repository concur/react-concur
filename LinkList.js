import React from 'react';
import Link from './Link';

export default class LinkList extends React.Component {
  render() {
    return (
      <div>
        {this.props.hrefs.map(href => {
          return <Link key={href} page={href} />
        })}
      </div>
    );
    
  }

}