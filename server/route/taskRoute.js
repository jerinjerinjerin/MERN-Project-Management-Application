import express from 'express';
import { 
    createTask, 
    deleteTask, 
    getAllTasks, 
    getSingleTask, 
    updateTask 
} from '../Controller/taskController.js';

const router = express.Router();

router.post('/createTask', createTask);
router.get('/getAllTasks', getAllTasks);
router.get('/getSingleTask/:id', getSingleTask);
router.put('/updateTask/:id', updateTask);
router.delete('/deleteTask/:id', deleteTask);

export default router;