import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function AddEmployee({ newemployee }) {
    const [show, setShow] = useState(false);


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const [formImg, setformImg] = useState("")
    const [formname, setformname] = useState("")
    const [formrole, setformrole] = useState("")


    const handlename = (e) => {
        setformname(e.target.value)
    }
    const handlerole = (e) => {
        setformrole(e.target.value)
    }
    const handleimg = (e) => {
        setformImg(e.target.value)
    }
    const handlesubmit = (e) => {
        e.preventDefault()
        newemployee(formname, formrole, formImg)
        handleClose();
        setformImg('')
        setformname('')
        setformrole("")
    }

    return (
        <>
            <button onClick={handleShow}
                className="block mx-auto m-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">+ Add Employee</button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add Employee</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <form onSubmit={handlesubmit} id="updating" className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                Name
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Will Smith" value={formname} onChange={handlename} />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">
                                Role
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="role" type="text" placeholder="Developer" value={formrole} onChange={handlerole} />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="img">
                                Image Url
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="img" type="text" placeholder="http://google.com" value={formImg} onChange={handleimg} />
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

export default AddEmployee;