// Obtain the datasource registered with the name "db"
// 'use strict';

// module.exports = function(app, callback) {
//     const dataSource = app.dataSources.mysql;

//     dataSource.discoverAndBuildModels(
//         'inscripcion', { relations: true },
//         function(err, models) {
//             if (err) return callback(err);

//             // Step 2: expose all new models via REST API
//             for (const modelName in models) {
//                 app.model(models[modelName], { dataSource: dataSource });
//             }
            
//             callback();
//         });
// };
        // Step 1: define a model for "INVENTORY" table,
        // including any models for related tables (e.g. "PRODUCT").