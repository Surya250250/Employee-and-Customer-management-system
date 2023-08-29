import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Addcustomer({ newcustomer }) {
    const [show, setShow] = useState();


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    const [formname, setformname] = useState("")
    const [formindustry, setformindustry] = useState("")


    const handlename = (e) => {
        setformname(e.target.value)
    }
    const handleindustry = (e) => {
        setformindustry(e.target.value)
    }

    const handlesubmit = (e) => {
        e.preventDefault()
        newcustomer(formname, formindustry)
        handleClose();
        setformname('')
        setformindustry("")
    }

    return (
        <>
            <button onClick={handleShow}
                className="block  my-3 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">+ Add Customer</button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add Customer</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <form onSubmit={handlesubmit} id="updating" className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                Name
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Google" value={formname} onChange={handlename} />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="industry">
                                Industry
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="role" type="text" placeholder="Computing" value={formindustry} onChange={handleindustry} />
                        </div>




                    </form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button form="updating" type="submit" variant="primary">Add</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Addcustomer;