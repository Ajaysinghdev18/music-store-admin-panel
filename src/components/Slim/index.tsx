// Dependencies
import React from 'react';

import '../../plugins/slim/slim.min.css';
// Slim module
import SlimModule from '../../plugins/slim/slim.module.js';
// Interface
import { ISlimData } from '../../shared/types/slim.type';

interface ISlimProps {
  initialImage?: string;
  didSave?: (data: ISlimData) => void;
  didRemove?: () => void;
}

// Export slim component
export class Slim extends React.Component<ISlimProps> {
  // Create ref
  ref = React.createRef<HTMLDivElement>();

  componentDidMount() {
    const root = this.ref.current;
    if (this.props.initialImage) {
      const img = document.createElement('img');
      img.setAttribute('alt', '');
      img.src = this.props.initialImage;
      if (root) {
        root.appendChild(img);
      }
    }
    // @ts-ignore
    this.instance = SlimModule ? SlimModule.create(root, this.props) : null;
  }

  // Render
  render() {
    return (
      <div className="slim" ref={this.ref}>
        {this.props.children}
      </div>
    );
  }
}
