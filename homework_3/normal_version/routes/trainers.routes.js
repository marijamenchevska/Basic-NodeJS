import { Router } from 'express';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { readData, writeData } from '../services/db.service.js';
import logger from '../services/logger.service.js';

const trainersPath = path.join(import.meta.dirname, '..', 'data', 'trainers.json');

const router = Router();

router.get('', (req, res) => {
    if(req.query.currentlyActive) {
        const currentlyTeaching = req.query.currentlyActive;

        logger.emit("log", `GET trainers by currentlyActive: ${currentlyTeaching} evoked.`);

        const trainers = readData(trainersPath);

        const filteredTrainers = trainers.filter(trainer => trainer.isCurrentlyTeaching.toString() === currentlyTeaching);
        
        if(currentlyTeaching !== 'true' && currentlyTeaching !== 'false') {
            res.send("Invalid query parameter.");
        }
        else if(filteredTrainers.length === 0) {
            res.send("No such trainers were found.");
        }

        res.send(filteredTrainers);
    }
    else if(req.query.sortBy) {
        const sortingOrder = req.query.sortBy;

        logger.emit("log", `GET trainers by sortBy: ${sortingOrder} evoked.`);

        const trainers = readData(trainersPath);

        if(sortingOrder === "coursesAsc") {
            trainers.sort((a, b) => a.coursesFinishedCount - b.coursesFinishedCount);
            res.send(trainers);
        }
        else if (sortingOrder === "coursesDesc") {
            trainers.sort((a, b) => b.coursesFinishedCount - a.coursesFinishedCount);
            res.send(trainers);
        }

        res.send("Invalid query parameter.");
    }
    else {
        logger.emit("log", "GET all trainers evoked.");

        const trainers = readData(trainersPath);
        const currentlyTeaching = req.query.currentlyActive;
        console.log(currentlyTeaching);

        res.send(trainers);
    }
});

router.get('/:id', (req, res) => {
    const reqId = req.params.id;

    logger.emit("log", `GET trainer by id: ${reqId} evoked.`);

    const trainers = readData(trainersPath);

    const trainer = trainers.find(trainer => trainer.id === reqId);

    if (!trainer) {
        res.send("No such trainer has been found.");
    }

    res.send(trainer);
});

router.post('', (req, res) => {
    const reqTrainer = req.body;

    logger.emit("log", `POST a trainer with body: ${reqTrainer} evoked.`);

    const newTrainer = {
        ...reqTrainer,
        id: uuidv4()
    };

    const trainers = readData(trainersPath);

    trainers.push(newTrainer);

    writeData(trainersPath, trainers);

    res.send(newTrainer);
});

router.put('/:id', (req, res) => {
    const reqId = req.params.id;

    logger.emit("log", `PUT a trainer by id: ${reqId} evoked.`);

    const reqBody = req.body;

    const trainers = readData(trainersPath);

    const index = trainers.findIndex(trainer => trainer.id === reqId);

    trainers[index] = {
        ...reqBody,
        id: reqId
    };

    writeData(trainersPath, trainers);

    res.send(trainers[index]);
});

router.patch('/:id', (req, res) => {
    const reqId = req.params.id;

    logger.emit("log", `PATCH a trainer by id: ${reqId} evoked.`);

    const reqBody = req.body;

    const trainers = readData(trainersPath);

    const index = trainers.findIndex(trainer => trainer.id === reqId);
    
    trainers[index] = {
        ...trainers[index],
        ...reqBody,
        id: reqId
    };

    writeData(trainersPath, trainers);

    res.send(trainers[index]);
});

router.delete('/:id', (req, res) => {
    const reqId = req.params.id;

    logger.emit("log", `DELETE a trainer by id: ${reqId} evoked.`);

    const trainers = readData(trainersPath);

    const filteredTrainers = trainers.filter(trainer => trainer.id !== reqId);

    writeData(trainersPath, filteredTrainers);

    res.send();
});

router.delete('', (req, res) => {
    logger.emit("log", `DELETE all trainers evoked.`);

    writeData(trainersPath, []);

    res.send();
})

export default router;

