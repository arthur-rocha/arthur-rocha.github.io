draw_timeline = function(){

    var lines_color="#2b2a2a";
    var background_color="#e4e4e4";
    var unselected_color="#ededed";
    var w=1000, h=240;
    var atributes_dict = {};

    var timeline_area = new Raphael(document.getElementById('timeline_container'), w, h);
    timeline_area.setViewBox(0,0,w,h,true);
    timeline_area.setSize('100%', '100%')   

    var line = timeline_area.rect(40,h/2,w-80,5,2);

    line.attr({fill:lines_color, stroke:lines_color});

    var timestamps = timeline_area.set(

        first_event = timeline_area.circle(40 + 40, h/2 + 3, 15)


    );

    timestamps.attr({fill:background_color, "stroke-width":6, stroke:lines_color});
    



    //draw_stamp_legend(first_event,80, h/2 + 3 + 16)

    function draw_stamp_legend(timestamp, timestamp_x, timestamp_y,
         text_sign, color_stamp, labels, legend, circle_name, label_name,
         all_circle_names, all_label_names){
    


        timestamp.mouseover(function(){
          
            line.animate({fill:unselected_color, stroke:unselected_color},100);

            this.animate({r:20, "stroke-width":7, fill: color_stamp},150,"bounce");
          
            description = timeline_area.path("M" + (timestamp_x) + "," + (timestamp_y))
            description.attr({"stroke-width":7, stroke:lines_color})
          

            description.animate({path :
                            // 'M'ove to the 'dent' in the bubble
                            "M" + (timestamp_x) + "," + (timestamp_y + 5*text_sign)+
                            "l" + (0) + "," + (50*text_sign) +
                            "l" + (100*text_sign) + "," + (0) 
            }, 350, "backOut")
          
            description_text = timeline_area.text(timestamp_x + 45*text_sign, timestamp_y + 80*text_sign, legend)
            description_text.attr({"font-weight":"bold", "font-size":15, "font-family": "Raleway, sans-serif"});
          
            labels.animate({"font-weight":"bold", "font-size":19, fill:lines_color}, 120);
        
            // change others circles and labels
            others_circle_names = all_circle_names.
            filter(key => !circle_name.includes(key));

            others_label_names = all_label_names.
            filter(key => !label_name.includes(key));

            for(j = 0; j< others_circle_names.length; j++){

                atributes_dict[others_circle_names[j]].animate({stroke:unselected_color},120);
                atributes_dict[others_label_names[j]].animate({fill:unselected_color},120);            

            }

        });
    
        timestamp.mouseout(function(){

            line.animate({fill:lines_color, stroke:lines_color},100);
            this.animate({r:15,"stroke-width":6, fill:background_color},150,"bounce");
            description.remove();
            description_text.remove();
            labels.animate({"font-weight":"bold", "font-size":13,fill: "#7b7b7b"}, 120);
            
            // change others circles and labels
            others_circle_names = all_circle_names.
            filter(key => !circle_name.includes(key));

            others_label_names = all_label_names.
            filter(key => !label_name.includes(key));
            for(j = 0; j< others_circle_names.length; j++){

            atributes_dict[others_circle_names[j]].animate({stroke:lines_color},120);
            atributes_dict[others_label_names[j]].animate({fill: "#7b7b7b"},120);            

                }
        });


    
    }

    create_time_stuff(["Moura Rocha","Estats Jr.Consulting","State University of Maringá",
                        "Estats Jr. Consulting", "Trecsson Business", "H0 Consulting", "Mapi", "Isket"],
                        ["Administrative Advisor\n2015-2016","Marketing Advisor\n2016-2017",
                        "Probability/Inference Monitor\n2016-2018","President\n2017-2018",
                        "Commercial Analyst Intern\n2018-2018", "Statistical Intern\n2018-2019",
                        "Data Scientist\n2019-2020", "Data Scientist\n2020-Today"]);
    //function to create equidistant sequence

    function equidistant_seq(from, to, size){
        distance = (to-from)/(size-1) 

        x = Array(8);
        x[0] = from;
        x[size-1] = to;

        for(var i = 1; i< (size-1); i++){
            x[i] = x[i-1] + distance;
        }
        return(x);
    }


    function create_time_stuff(names, legends){
        n = names.length;
        x_timestamps = equidistant_seq(80,920,n);

        for(var i = 0; i<n; i++){
            text_sign = (-1)**i;

            atributes_dict["circle_" + (i)] = timeline_area.circle(x_timestamps[i],
                h/2 + 3, 15).attr({fill:background_color, "stroke-width":6, stroke:lines_color});;
            atributes_dict["labels_" + (i)] = timeline_area.text(x_timestamps[i],
                h/2 - 35*text_sign, names[i]).attr({"font-size":13,
                 "font-family": 'Raleway, sans-serif',"font-weight":"bold", fill: "#7b7b7b"});

        }

        //Maping the names
        all_circle_names = Array();
        all_label_names = Array();
        n_elements = Object.keys(atributes_dict).length/2;

        for(i = 0; i<n_elements;i++){
            all_circle_names[i] = "circle_" + (i);
            all_label_names[i] = "labels_" + (i)
        };

        //iterate again to separete properties
        for(var k = 0; k<n; k++){
            text_sign = (-1)**k;
            if(text_sign<0){color_stamp="#3fcfd2"}else{color_stamp="#f99790"};
            circle_name = "circle_" + (k);
            label_name = "labels_" + (k);

            draw_stamp_legend(atributes_dict["circle_" + (k)],
                x_timestamps[k], h/2 + 15*text_sign,
                text_sign, color_stamp, atributes_dict["labels_" + (k)],
                legends[k], circle_name, label_name,
                all_circle_names, all_label_names)
        }


    }

}