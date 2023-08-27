import React from 'react';

export const Button = ({ onClick, children }) => (
  <button type="button" className="load-more-button" onClick={onClick}>
    {children}
  </button>
);

// export class Button extends Component {
//     render() {
//       return (
//         <button className="load-more-button" onClick={this.props.onClick}>
//           Load more
//         </button>
//       );
//     }
//   }