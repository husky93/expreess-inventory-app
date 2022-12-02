#! /usr/bin/env node

console.log(
  'This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true'
);

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async');
var Category = require('./models/category');
var Item = require('./models/item');

var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var categories = [];
var items = [];

function categoryCreate(title, description, cb) {
  categorydetail = { title, description };

  var category = new Category(categorydetail);

  category.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Category: ' + category);
    categories.push(category);
    cb(null, category);
  });
}

function itemCreate(name, description, price, category, number_in_stock, cb) {
  var item = new Item({ name, description, price, category, number_in_stock });

  item.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Item: ' + item);
    items.push(item);
    cb(null, item);
  });
}

function createCategories(cb) {
  async.series(
    [
      function (callback) {
        categoryCreate(
          'Paint and Painting Supplies',
          'Youve got the ideas, talent, and drive. Weve got the painting supplies you need for every project.',
          callback
        );
      },
      function (callback) {
        categoryCreate(
          'Drawing Supplies',
          'Get the drawing supplies you need from brands you love.',
          callback
        );
      },
      function (callback) {
        categoryCreate(
          'Artist Canvas',
          'We have canvas for every style and skill level. Gift one-of-a-kind art for the holidays.',
          callback
        );
      },
      function (callback) {
        categoryCreate(
          'Paper & Drawing Pads',
          'Expand your drawing, illustrating and painting skills with a variety of high-quality, budget-friendly paper pads.',
          callback
        );
      },
      function (callback) {
        categoryCreate(
          'Sculpture & Modeling',
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
          callback
        );
      },
    ],
    // optional callback
    cb
  );
}

function createItems(cb) {
  async.parallel(
    [
      function (callback) {
        itemCreate(
          'Acrylic Ready-Mixed Pouring Paint by Artists Loft',
          'This ready-to-use pouring paint is a must-have in your art supply kit. You can pour it directly onto a canvas or other hard substances, without the need of diluting it with other mediums. It has a low viscosity and will lend a glossy finish to your completed artwork.',
          15.49,
          categories[0],
          400,
          callback
        );
      },
      function (callback) {
        itemCreate(
          'Liquitex BASICS® Acrylic 48 Color Set',
          'Developed for students and artists looking for quality paint at an outstanding value, these acrylics are ideal for learning color theory and practicing color mixing. This extensive set offers 48 of the most commonly used colors, perfect for experimenting artists as they explore acrylic painting techniques. Each color is formulated to bring out the maximum brilliance and clarity of the individual pigment, and the easy-to-use paint goes on thick and creamy and dries to a satin finish. A heavy body acrylic paint that retains peaks and brush strokes, its great for traditional and experimental acrylic painting, impasto, printmaking, collage and mixed media work.',
          79.99,
          categories[0],
          100,
          callback
        );
      },
      function (callback) {
        itemCreate(
          'Acrylic Paint by Artists Loft™, 8.5oz.',
          'Create beautiful detailed paintings on wood or canvas with this acrylic paint by Artists Loft. This rich, opaque paint is perfect to try out various painting techniques. You can also use it to decorate your planters, vases, trays and more.',
          9.99,
          categories[0],
          100,
          callback
        );
      },
      function (callback) {
        itemCreate(
          'White Synthetic Brushes by Artists Loft™ Necessities™',
          'Express your creativity with this collection of brushes that is suitable for acrylic and watercolor painting. A great value, this set includes different sizes and styles of brushes that are perfect for the student, teacher or artist who wants to experiment with different techniques and mediums.',
          6.99,
          categories[0],
          100,
          callback
        );
      },
      function (callback) {
        itemCreate(
          'Fundamentals™ Colored Pencils by Artists Loft®',
          'Fill your world with color using these quality Artists Loft pencils! These colored pencils are perfect for the beginning artist or the seasoned veteran who is interested in drawing and illustration. Easy to blend, they lay down smooth on your chosen art surface to help you show the world your kind of colorful. The colors included are Black, Blue Violet, Bright Green, Carmine, Cherry Red, Clay Yellow, Dark Blue, Dark Brown, Dark Green, Dark Pink, Emerald Green, Gold, Golden Yellow, Gray, Ivory, Ivory Yellow, Lavender, Lemon Yellow, Light Blue, Light Brown, Light Orange, Light Violet, Light Yellow, Medium Brown, Ocean Blue, Olive, Orange, Pastel Green, Pink, Red Brown, Silver, Spring Bud, Vermilion, White, Yellow Green, and Yellow Ochre.',
          5.99,
          categories[1],
          100,
          callback
        );
      },
      function (callback) {
        itemCreate(
          'Tombow Bright Dual Brush Pens',
          'This each marker in this set of 9 colors (with a colorless blender pen) features a flexible brush tip and fine tip in one marker. The brush tip works like a paintbrush to create fine, medium or bold strokes; the fine tip gives consistent lines. Dual Brush Pens are ideal for artists and crafters working on coloring, fine art, illustrations, doodling, journaling, hand lettering and more! Colors Include: 755 Rubine Red, 743 Hot Pink, 933 Orange, 055 Process Yellow, 133 Chartreuse, 173 Willow Green, 493 Reflex Blue, 665 Purple, 636 Imperial Purple, and N00 Colorless Blender.',
          26.99,
          categories[1],
          50,
          callback
        );
      },
      function (callback) {
        itemCreate(
          'Gel Pens with Stand by Artists Loft',
          'This cool gel pen set features a variety of colors. Use each hue to create beautiful, vibrant works of art. The pens write smoothly and do not smear. The ink styles in this set include: basic, metallic, neon, glitter, and pastel.',
          29.99,
          categories[1],
          50,
          callback
        );
      },
      function (callback) {
        itemCreate(
          'Faber-Castell® Creative Studio® Soft Pastels',
          'These pastel sticks are bright, intense, and will adhere to a variety of paper types and surfaces. Perfect for coloring, sketching, and drawing, this soft pastel set is a must-have for anyone looking to take their art to the next level.',
          17.99,
          categories[1],
          50,
          callback
        );
      },
      function (callback) {
        itemCreate(
          'Level 1 Back Stapled Canvas',
          'When students and novice artists are ready to paint on traditional canvas, they reach for this prepped back-stapled canvas. This top-quality canvas is ideal for use with acrylic and oil paints, featuring 100% cotton duck with an acid-free, titanium acrylic gesso primer. The canvas is stretched over a solid wood professional frame constructed with kiln-dried, beveled stretcher bars, so artists can create wonderful works of art that will last a lifetime.',
          8.99,
          categories[2],
          455,
          callback
        );
      },
      function (callback) {
        itemCreate(
          'Level 2 Gallery Wrapped Traditional Canvas',
          'Made with archival-quality, 100% cotton, this canvas is gesso primed so that you can start painting immediately. The medium/smooth texture surface is perfect for use with acrylic and oil paints, and the frame is professionally constructed. The medium-weight cotton duck is stretched around 3/4" profile kiln-dried stretcher bars and held in place with a flexible spline, so artists can paint on all four edges.',
          10.99,
          categories[2],
          321,
          callback
        );
      },
      function (callback) {
        itemCreate(
          '300 Series Wired Drawing Paper Pad, 50 Sheets',
          '300 Series drawing paper is a medium weight, student grade drawing paper suitable for final artwork. For use with dry media, the medium surface is good for graphite and colored pencil, charcoal and sketching stick, and it can also be used with marker, mixed media and pastels. The wire-bound pad contains acid-free paper that is micro-perforated for easy removal.',
          12.99,
          categories[3],
          21,
          callback
        );
      },
      function (callback) {
        itemCreate(
          '400 Series Recycled Toned Tan Sketch Paper Pad',
          '400 Series drawing paper is a medium weight, student grade drawing paper suitable for final artwork. For use with dry media, the medium surface is good for graphite and colored pencil, charcoal and sketching stick, and it can also be used with marker, mixed media and pastels. The wire-bound pad contains acid-free paper that is micro-perforated for easy removal.',
          8.99,
          categories[3],
          32,
          callback
        );
      },
      function (callback) {
        itemCreate(
          '4 Pack: Natural Clay by Craft Smart',
          'No kiln needed! These all-purpose, air-dry clay are ideal for sculpting, hand modeling or throwing on a potters wheel. Air dry your finished pieces slowly and evenly on all sides for best results. Decorate your creations with paint, if desired. This clay is fragile when dry, but you can seal it with shellac to waterproof it.',
          32.99,
          categories[4],
          34,
          callback
        );
      },
      function (callback) {
        itemCreate(
          'Casting & Coating Resin by Craft Smart',
          'Quality casting and coating epoxy resin that cures to a clear, solid and strong finished with minimal odor. Quality coating epoxy resin that is self-leveling and heat and alcohol resistant. The epoxy coating resin can be use on a variety of medium such as wood, fabric, decals, painted surfaces, dried flowers, plaster, rocks, seashells and more. Durable and resilient it requires zero polishing to produce a high-gloss look. Work time 30 minutes, cures in 12 hours, full strength in 72 hours.',
          65.99,
          categories[4],
          22,
          callback
        );
      },
      function (callback) {
        itemCreate(
          'Alumilite Amazing Clear Cast, 16oz.',
          'Alumilite’s Amazing Clear Cast epoxy adds a clear, durable, and high-gloss coatings to nearly any surface, plus it’s FDA Compliant! Use it to coat decorated serving trays, coasters, tumblers, coffee tables, and more! This casting resin is easy to use and dries to offer rigid, clear plastic objects. It cures overnight and evacuates air bubbles for clean, durable casts. You can decorate the cured items with non-water base colors.',
          24.99,
          categories[4],
          32,
          callback
        );
      },
    ],
    // optional callback
    cb
  );
}

async.series(
  [createCategories, createItems],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log('FINAL ERR: ' + err);
    } else {
      console.log('BOOKInstances: ' + bookinstances);
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);
