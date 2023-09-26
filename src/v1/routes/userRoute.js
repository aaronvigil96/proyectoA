import { Router } from "express";
import {userController} from '../../controllers/userController.js';

const router = Router()

router.get("/", userController.getAll);
router.get("/:id", userController.get);
router.put("/:id", userController.update);
router.delete("/:id", userController.delete);

export default router;