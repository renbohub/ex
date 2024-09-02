var express = require('express');
var knex = require('../../config/connection');

const GetByNumber = async (req, res) => {
    try {
        var torque = await knex.table('t_limit_torque');
        
        var data1 = await knex.table('char_imam016').select(knex.raw(''+torque[0].upper+' as upper,'+torque[0].lower+' as lower, `last_update` as ts ,SUBSTRING(`data_rfid` , 8,7) as engine_no,SUBSTRING(`data_rfid` , 23,5) as model, CONVERT(SUBSTRING(`data_nut_runner` , 16,2), FLOAT) as screw_no , CONVERT(SUBSTRING(`data_nut_runner` , 18,1),FLOAT) as spindel, CONVERT(SUBSTRING(`data_nut_runner` , 19,7),FLOAT) as torque ,CONVERT(SUBSTRING(`data_nut_runner` , 26,7),FLOAT) * 1000 as `time` ,CONVERT(SUBSTRING(`data_nut_runner` , 35,5),FLOAT)  as `angle` , SUBSTRING(`data_nut_runner` , 40,4) as ng_code'))
                    .whereRaw('SUBSTRING(`data_rfid` , 8,7) = "'+req.query.machine_no+'"');
        var data2 = await knex.table('char_imam004').select(knex.raw(''+torque[2].upper+' as upper,'+torque[2].lower+' as lower,`last_update` as ts ,SUBSTRING(`data_rfid` , 8,7) as engine_no,SUBSTRING(`data_rfid` , 23,5) as model, CONVERT(SUBSTRING(`data_nut_runner` , 16,2), FLOAT) as screw_no , CONVERT(SUBSTRING(`data_nut_runner` , 18,1),FLOAT) as spindel, CONVERT(SUBSTRING(`data_nut_runner` , 19,7),FLOAT) as torque ,CONVERT(SUBSTRING(`data_nut_runner` , 26,7),FLOAT) * 1000 as `time` ,CONVERT(SUBSTRING(`data_nut_runner` , 35,5),FLOAT)  as `angle` , SUBSTRING(`data_nut_runner` , 40,4) as ng_code'))
                    .whereRaw('SUBSTRING(`data_rfid` , 8,7) = "'+req.query.machine_no+'"');
        var data3 = await knex.table('char_imam014').select(knex.raw(''+torque[1].upper+' as upper,'+torque[1].lower+' as lower,`last_update` as ts ,SUBSTRING(`data_rfid` , 8,7) as engine_no,SUBSTRING(`data_rfid` , 23,5) as model, CONVERT(SUBSTRING(`data_nut_runner` , 16,2), FLOAT) as screw_no , CONVERT(SUBSTRING(`data_nut_runner` , 18,1),FLOAT) as spindel, CONVERT(SUBSTRING(`data_nut_runner` , 19,7),FLOAT) as torque ,CONVERT(SUBSTRING(`data_nut_runner` , 26,7),FLOAT) * 1000 as `time` ,CONVERT(SUBSTRING(`data_nut_runner` , 35,5),FLOAT)  as `angle` , SUBSTRING(`data_nut_runner` , 40,4) as ng_code'))
                    .whereRaw('SUBSTRING(`data_rfid` , 8,7) = "'+req.query.machine_no+'"');
        console.log(data1) ;      
        return res.status(200).send({
            message: "Success",
            data: {
                imam016 : data1,
                imam004 : data2,
                imam014 : data3
            }
        });
    } catch (e) {
        console.log(e);
        res.status(400).send({
            message: "Database Issue",
            data: e
        });
    }
};

const GetByTime = async (req, res) => {
    try {

        var shift = await knex.table('list_shift').where({shift_no:req.query.shift});
        var torque = await knex.table('t_limit_torque');
        var s_start = ''+req.query.date+'T'+shift[0].shift_start+'';
        var s_end = ''+req.query.date+'T'+shift[0].shift_end+'';
        let date1 = new Date(s_start);
        let result1 = date1.getTime();
        let date2 = new Date(s_end);
        if(shift[0].shift_add_end == 1){
        var result2 = date2.getTime() + (3600 * 24 *1000);
        }else{
         result2 = date2.getTime()   
        }
        console.log(result1,result2)
        var data1 = await knex.table('char_imam016').select(knex.raw(''+torque[0].upper+' as upper,'+torque[0].lower+' as lower,`last_update`  as ts ,SUBSTRING(`data_rfid` , 7,7) as engine_no,SUBSTRING(`data_rfid` , 23,5) as model, CONVERT(SUBSTRING(`data_nut_runner` , 16,2), FLOAT) as screw_no , CONVERT(SUBSTRING(`data_nut_runner` , 18,1),FLOAT) as spindel, CONVERT(SUBSTRING(`data_nut_runner` , 19,7),FLOAT) as torque ,CONVERT(SUBSTRING(`data_nut_runner` , 26,7),FLOAT) * 1000 as `time` ,CONVERT(SUBSTRING(`data_nut_runner` , 35,5),FLOAT)  as `angle` , SUBSTRING(`data_nut_runner` , 40,4) as ng_code'))
                        .whereRaw('UNIX_TIMESTAMP(`last_update`) *1000  BETWEEN '+result1+' AND '+result2+'');
        var data2 = await knex.table('char_imam004').select(knex.raw(''+torque[2].upper+' as upper,'+torque[2].lower+' as lower,`last_update` as ts ,SUBSTRING(`data_rfid` , 7,7) as engine_no,SUBSTRING(`data_rfid` , 23,5) as model, CONVERT(SUBSTRING(`data_nut_runner` , 16,2), FLOAT) as screw_no , CONVERT(SUBSTRING(`data_nut_runner` , 18,1),FLOAT) as spindel, CONVERT(SUBSTRING(`data_nut_runner` , 19,7),FLOAT) as torque ,CONVERT(SUBSTRING(`data_nut_runner` , 26,7),FLOAT) * 1000 as `time` ,CONVERT(SUBSTRING(`data_nut_runner` , 35,5),FLOAT)  as `angle` , SUBSTRING(`data_nut_runner` , 40,4) as ng_code'))
                        .whereRaw('UNIX_TIMESTAMP(`last_update`) *1000  BETWEEN '+result1+' AND '+result2+'');
        var data3 = await knex.table('char_imam014').select(knex.raw(''+torque[1].upper+' as upper,'+torque[1].lower+' as lower,`last_update` as ts ,SUBSTRING(`data_rfid` , 7,7) as engine_no,SUBSTRING(`data_rfid` , 23,5) as model, CONVERT(SUBSTRING(`data_nut_runner` , 16,2), FLOAT) as screw_no , CONVERT(SUBSTRING(`data_nut_runner` , 18,1),FLOAT) as spindel, CONVERT(SUBSTRING(`data_nut_runner` , 19,7),FLOAT) as torque ,CONVERT(SUBSTRING(`data_nut_runner` , 26,7),FLOAT) * 1000 as `time` ,CONVERT(SUBSTRING(`data_nut_runner` , 35,5),FLOAT)  as `angle` , SUBSTRING(`data_nut_runner` , 40,4) as ng_code'))
                    .whereRaw('UNIX_TIMESTAMP(`last_update`) *1000  BETWEEN '+result1+' AND '+result2+'');

        
        return res.status(200).send({
        message: "Success",
        data: {
            imam016 : data1,
            imam004 : data2,
            imam014 : data3
        }
        });
    } catch (e) {
        console.log(e);
        res.status(400).send({
            message: "Database Issue",
            data: e
        });
    }
};



module.exports = { GetByNumber, GetByTime };
