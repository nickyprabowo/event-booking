import React, { Component, Fragment, ReactNode } from "react";
import ReactDOM from "react-dom";

import "./Modal.css";
// I want to create Modal
// called with <Modal {..some props} />
// you can put anything into a modal
// the Modal only provide a popup mechanism and a cancel button
interface modalProps {
    isActive: boolean,
	onClose(): void,
	children?: any
};

interface modalState {
    el: HTMLElement
}

const modalRoot = document.getElementById("modal-root");

class Modal extends Component<modalProps, modalState> {
	constructor(props: modalProps){
		super(props)
		this.state = {
            el: document.createElement('div')
        };
	}

	onEscapePress = (e: { key: string; keyCode: number; }) => {
		if(e.key === 'Escape' || e.keyCode === 27) this.props.onClose();
	}

	componentDidMount = () => {
		if (this.props.onClose) {
			window.addEventListener('keydown', this.onEscapePress, true);
		}
		if(modalRoot) modalRoot.appendChild(this.state.el);
	}

	componentWillUnmount = () => {
		if (this.props.onClose) {
			window.removeEventListener('keydown', this.onEscapePress, true);
		}
		if(modalRoot) modalRoot.removeChild(this.state.el);
	}

	preventClose = (e: { stopPropagation: () => void }) => {
		e.stopPropagation();
	}

	render(){
		const { isActive, onClose, children } = this.props;

		if(isActive){
			return (
				ReactDOM.createPortal(
					<Fragment>
						<div className="overlay" onClick={onClose}>
							<div className="modal" onClick={this.preventClose}>
							    {children}
							</div>
						</div>
					</Fragment>,
			      this.state.el
			    )
			)
		}else return null;
	}	
}

export default Modal;