/* global use, db */
// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use('worldcomputer');

// Search for documents in the current collection.
db.getCollection('Heart').aggregate([
    {
      $group: {
        _id: { firstName: "$firstName", lastName: "$lastName" },
        count: { $sum: 1 },
        docs: { $push: "$_id" }
      }
    },
    {
      $match: {
        count: { $gt: 1 } // Finding documents with count greater than 1 (duplicates)
      }
    }
  ])

  db.getCollection('Mind').aggregate([
    {
      $group: {
        _id: { firstName: "$firstName", lastName: "$lastName" },
        count: { $sum: 1 },
        docs: { $push: "$_id" }
      }
    },
    {
      $match: {
        count: { $gt: 1 } // Finding documents with count greater than 1 (duplicates)
      }
    }
  ])

  db.getCollection('Spirit').aggregate([
    {
      $group: {
        _id: { firstName: "$firstName", lastName: "$lastName" },
        count: { $sum: 1 },
        docs: { $push: "$_id" }
      }
    },
    {
      $match: {
        count: { $gt: 1 } // Finding documents with count greater than 1 (duplicates)
      }
    }
  ])

  db.getCollection('Soul').aggregate([
    {
      $group: {
        _id: { firstName: "$firstName", lastName: "$lastName" },
        count: { $sum: 1 },
        docs: { $push: "$_id" }
      }
    },
    {
      $match: {
        count: { $gt: 1 } // Finding documents with count greater than 1 (duplicates)
      }
    }
  ])

  db.getCollection('Body').aggregate([
    {
      $group: {
        _id: { firstName: "$firstName", lastName: "$lastName" },
        count: { $sum: 1 },
        docs: { $push: "$_id" }
      }
    },
    {
      $match: {
        count: { $gt: 1 } // Finding documents with count greater than 1 (duplicates)
      }
    }
  ])
