const express = require('express');
const router =require('express').Router();

const contactsController = require('../controllers/contacts');

/**
 * @swagger
 * /contacts:
 *   get:
 *     summary: Get all contacts
 *     description: Fetches all contacts from the database.
 *     responses:
 *       200:
 *         description: A list of contacts.
 */
router.get('/', contactsController.getAll);

/**
 * @swagger
 * /contacts/{id}:
 *   get:
 *     summary: Get a single contact
 *     description: Fetches a contact by its ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single contact.
 *       404:
 *         description: Contact not found.
 */
router.get('/:id', contactsController.getSingle);

/**
 * @swagger
 * /contacts:
 *   post:
 *     summary: Create a new contact
 *     description: Adds a new contact to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               birthday:
 *                 type: string
 *                 format: date
 *               favoriteColor:  # ✅ Added this field
 *                 type: string
 *     responses:
 *       201:
 *         description: Contact successfully created.
 */
router.post("/", contactsController.createContact);

/**
 * @swagger
 * /contacts/{id}:
 *   put:
 *     summary: Update a contact
 *     description: Modifies an existing contact by ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               birthday:
 *                 type: string
 *                 format: date
 *               favoriteColor:  # ✅ Added this field
 *                 type: string
 *     responses:
 *       200:
 *         description: Contact successfully updated.
 */
router.put("/:id", contactsController.updateContact);

/**
 * @swagger
 * /contacts/{id}:
 *   delete:
 *     summary: Delete a contact
 *     description: Removes a contact from the database using its ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contact successfully deleted.
 *       404:
 *         description: Contact not found.
 */
router.delete("/:id", contactsController.deleteContact);

module.exports = router;