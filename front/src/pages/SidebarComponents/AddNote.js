import { jsx as _jsx } from "react/jsx-runtime";
import { useNavigate } from 'react-router-dom';
import NoteEditor from '@/components/NoteEditor';
const AddNote = () => {
    const navigate = useNavigate();
    return (_jsx("div", { className: "h-full", children: _jsx(NoteEditor, { onSaveComplete: () => navigate('/my-notes') }) }));
};
export default AddNote;
