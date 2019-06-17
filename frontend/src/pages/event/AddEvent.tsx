import React, { Fragment } from 'react';
import Modal from "../../components/modal/Modal";

interface AddEvent {
    show: boolean,
    onClose(): void,
    onSubmit(e: React.MouseEvent<HTMLButtonElement>): void,
    handleChange(e: React.FormEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>): void
}

export default function AddEvent(props: AddEvent) {
    return (
        <Modal
            isActive={props.show}
            onClose={props.onClose}
        >
            <div className="modal__body">
                <form>
                    <div className="form-control">
                        <label>Title</label>
                        <input type="text" name="title" placeholder="your title" onChange={props.handleChange}/>
                    </div>
                    <div className="form-control">
                        <label>Price</label>
                        <input type="text" name="price" placeholder="your ticket price"  onChange={props.handleChange}/>
                    </div>
                    <div className="form-control">
                        <label>Date</label>
                        <input type="datetime-local" name="date" placeholder="the date" onChange={props.handleChange} />
                    </div>
                    <div className="form-control">
                        <label>Description</label>
                        <textarea rows={6} cols={10} name="description" placeholder="your description here..." onChange={props.handleChange} />
                    </div>
                </form>
            </div>
            <div className="modal__action">
                <button onClick={props.onClose}>Cancel</button>
                <button type="submit" onClick={props.onSubmit}>Save</button>
            </div>
        </Modal>
    )
};
