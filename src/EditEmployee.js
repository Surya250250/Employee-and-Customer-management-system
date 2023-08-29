import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function EditEmployee({ name, role, update, id, img }) {
    const [show, setShow] = useState(false);


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    const [formname, setformname] = useState(name)
    const [formrole, setformrole] = useState(role)
    const [formimg, setformimg] = useState(img)


    const handlename = (e) => {
        setformname(e.target.value)
    }
    const handlerole = (e) => {
        setformrole(e.target.value)
    }
    const handleimg = (e) => {
        setformimg(e.target.value)
    }
    const handlesubmit = (e) => {
        e.preventDefault()
        const data = {
            id: id,
            name: formname,
            role: formrole,
            img: formimg

        }
        update(data)
        handleClose();
    }

    return (
        <>
            <button onClick={handleShow}
                className="px-4 py-1 text-sm text-blue-600 font-semibold rounded-full border border-blue-200 hover:text-white hover:bg-blue-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2">Update</button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Update Employee</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <form onSubmit={handlesubmit} id="updating" className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                Name
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="name" value={formname} onChange={handlename} />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">
                                Role
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="role" type="text" placeholder="Role" value={formrole} onChange={handlerole} />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="img">
                                Image link
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="img" type="text" placeholder="img" value={formimg} onChange={handleimg} />
                        </div>


                        <p className="text-center text-gray-500 text-xs">

                        </p>
                    </form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button form="updating" type="submit" variant="primary">Update</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default EditEmployee;