const lineData = [[10,9,6,11,14,15,18,16,13,26,27,28,
  27,29,31,37,41,42,40,43,47,51,58,62,50,51,52,40,31,
  37,38,37,29,31,37,41,42,27,22,28,29,32,30,29,28,31,
  26,27,28,27,29,31,37,41,42,40,43,47,51,58,32,50,51,
  52,40,26,27,28,27,29,31,37,41,42,27,22,37,41,42,36,
  38,40,53,45,52,46,48,46,51,58,53,54,52,48,56,62,58,
  62,64,61], [
  28,26,17,21,23,22,16,18,16,22,21,19,20,21,17,24,28,
  22,23,25,18,22,29,45,39,51,52,40,31,37,38,37,29,31,
  37,41,42,27,22,28,29,32,30,29,28,31,26,27,28,27,29,
  31,37,41,42,40,43,47,51,58,32,50,51,52,40,26,27,28,
  27,29,31,37,41,42,27,22,37,41,42,36,38,40,53,45,52,
  46,48,46,51,58,53,54,52,48,56,62,58,62,64,61], [
  10,9,6,11,14,15,18,16,13,26,27,28,27,29,31,37,41,42,
  40,43,47,51,58,62,50,51,52,40,31,37,38,37,29,31,37,
  41,42,27,22,28,29,32,30,29,28,31,26,27,28,27,29,31,
  37,41,42,40,43,47,51,58,32,50,51,52,40,26,27,28,27,
  29,31,37,41,42,27,22,37,41,42,36,38,40,53,45,52,46,
  48,46,51,58,53,54,52,48,56,62,58,62,64,61]];

const chart = d3.select('#chart');
    const ctnr = d3.select('#chart-grp');
  
    // Create the polygon
    const chartHeight = 700;
    const chartWidth = 1000;
    const yShiftUp = 400;
  
    const polyHeight = 250;
    const polyWidth  = 700;
    const polyPoints = -polyWidth / 2 + ",0 " +
                     "0,"           + -polyHeight / 2 + " " +
                     polyWidth / 2  + ",0 " +
                     "0,"           + polyHeight / 2;
  
    // Create sine curve
    const sineHeight = 60;
    const width = polyWidth * 0.1975;  // this ratio comes from the skewY in the CSS
    const ticks = 40;
  
    const x = d3.scaleLinear()
      .domain([0, ticks - 1])
      .range([0, width]);
    const y = d3.scaleLinear()
      //.domain([-1, 1])
      .range([sineHeight, 0]);
  
    const line = d3.line()
      .x(function(d, i) { return x(i); })
      .y(function(d, i) { return y(d); })
      .curve(d3.curveBasis);
  
    //const curve = line(data);
  
    // Create the areas from the sine curve
    function curveToArea (y, lineData, areaHeight) {
      y.domain(d3.extent(lineData))
      const curve = line(lineData)
      const firstBit = curve.slice(0,1);
      const bottomLeft = "0," + areaHeight + "L";
      const middleBit = curve.slice(1);
      const bottomRight = "L" + polyWidth / 2 + "," + areaHeight;
      return [firstBit + bottomLeft + middleBit + bottomRight + "Z",
              bottomLeft, middleBit, bottomRight];
    }
  
    const bottomBaseHeight = 80;
    const middleBaseHeight = 110;
    const topBaseHeight = 140;
  
    const bottomAreaD = curveToArea(y, lineData[0], bottomBaseHeight);
    const middleAreaD = curveToArea(y, lineData[1], middleBaseHeight);
    const topAreaD = curveToArea(y, lineData[2], topBaseHeight);
  
    // Calculate the translates (where we'll place the areas on the polygon
    const emptySpaceSide = (chartWidth - polyWidth) / 2;
    const emptySpaceTop = (chartHeight - polyHeight) / 2;
  
    const topTransX = emptySpaceSide + 0.2 * polyWidth / 2;
    const topTransY = emptySpaceTop + (0.5 * polyHeight) - topBaseHeight + sineHeight;
  
    const middleTransX = emptySpaceSide + 0.5 * polyWidth / 2;
    const middleTransY = emptySpaceTop + (0.65 * polyHeight) - middleBaseHeight + sineHeight;
  
    const bottomTransX = emptySpaceSide + 0.8 * polyWidth / 2;
    const bottomTransY = emptySpaceTop + (0.8 * polyHeight) - bottomBaseHeight + sineHeight;

    // Append them shits
    ctnr
      .append('polygon')
        .attr('id', 'base')
        .attr('points', polyPoints);
  
    // Go through the areas
  
    const topAreaCtnr = chart.append('g')
      .attr('id', 'top-area-ctnr')
      .attr('transform', "translate(" + topTransX + ", " + topTransY + ")");
  
    const middleAreaCtnr = chart.append('g')
      .attr('id', 'middle-area-ctnr')
      .attr('transform', "translate(" + middleTransX + ", " + middleTransY + ")");
    
    const bottomAreaCtnr = chart.append('g')
      .attr('id', 'bottom-area-ctnr')
      .attr('transform', "translate(" + bottomTransX + ", " + bottomTransY + ")");
    
    // Draw the areas of the chart 
    drawArea(topAreaCtnr, 'top', topAreaD[0]);
    drawArea(middleAreaCtnr, 'middle', middleAreaD[0]);
    drawArea(bottomAreaCtnr, 'bottom', bottomAreaD[0]);

    // Now do some labels
    drawLabels(topAreaCtnr, '2021');
    drawLabels(middleAreaCtnr, '2022');
    drawLabels(bottomAreaCtnr, '2023');

    // Draw the text
    
    const aboutText = d3.select('#top-area-ctnr')
      .append('text')
        .attr('class', 'main-text')
        .attr('id', 'main-text-2021')
        .attr('opacity', 0);
        //.attr('visibility', 'hidden')

    aboutText
      .append('tspan')
        .attr('class', 'title-in-text')
        .text(`Процент трудоустройства 75%`)

    aboutText
      .append('tspan')
        .attr('dy', 50)
        .attr('x', 0)
        .text('Банкоское дело ')
      .append('tspan')
        .attr('x', 220)
        .text('15%')
   
    aboutText
      .append('tspan')
        .attr('dy', 30)
        .attr('x', 0)
        .text("Системное администрирование")
        .append('tspan')
        .attr('x', 220)
        .text('17.2%')
   
   
    aboutText
      .append('tspan')
        .attr('dy', 30)
        .attr('x', 0)
        .text('Реклама')
        .append('tspan')
        .attr('x', 220)
        .text('13.8%')

    aboutText
      .append('tspan')
        .attr('dy', 30)
        .attr('x', 0)
        .text("Телекоммуникации")
        .append('tspan')
        .attr('x', 220)
        .text('16.4%')

    aboutText
      .append('tspan')
        .attr('dy', 30)
        .attr('x', 0)
        .text("Разработка веб-приложений")
        .append('tspan')
        .attr('x', 220)
        .text('15.3%')
    
    aboutText
      .append('tspan')
        .attr('dy', 30)
        .attr('x', 0)
        .text("Тех. поддержка")
        .append('tspan')
        .attr('x', 220)
        .text('12.9%')

    aboutText
      .append('tspan')
        .attr('dy', 30)
        .attr('x', 0)
        .text("Проектирование баз данных")
        .append('tspan')
        .attr('x', 220)
        .text('9.9%')


    const designText = d3.select('#middle-area-ctnr')
      .append('text')
        .attr('class', 'main-text')
        .attr('id', 'main-text-2022')
        .attr('opacity', 0)
        //.attr('visibility', 'hidden')

   
        designText
      .append('tspan')
        .attr('class', 'title-in-text')
        .text(`Процент трудоустройства 75%`)

        designText
        .append('tspan')
          .attr('dy', 50)
          .attr('x', 0)
          .text('Банкоское дело')
          .append('tspan')
          .attr('x', 220)
          .text('15%')
     
          designText
        .append('tspan')
          .attr('dy', 30)
          .attr('x', 0)
          .text("Системное администрирование")
          .append('tspan')
          .attr('x', 220)
          .text('17%')
     
     
          designText
        .append('tspan')
          .attr('dy', 30)
          .attr('x', 0)
          .text('Реклама')
          .append('tspan')
          .attr('x', 220)
          .text('14%')
  
          designText
        .append('tspan')
          .attr('dy', 30)
          .attr('x', 0)
          .text("Телекоммуникации")
          .append('tspan')
          .attr('x', 220)
          .text('16%')
  
          designText
        .append('tspan')
          .attr('dy', 30)
          .attr('x', 0)
          .text("Разработка веб-приложений")
          .append('tspan')
          .attr('x', 220)
          .text('15%')
      
          designText
        .append('tspan')
          .attr('dy', 30)
          .attr('x', 0)
          .text("Тех. поддержка")
          .append('tspan')
          .attr('x', 220)
          .text('13%')
  
          designText
        .append('tspan')
          .attr('dy', 30)
          .attr('x', 0)
          .text("Проектирование баз данных")
          .append('tspan')
          .attr('x', 220)
          .text('10%')
    
    const codeText = d3.select('#bottom-area-ctnr')
      .append('text')
        .attr('class', 'main-text')
        .attr('id', 'main-text-2023')
        .attr('opacity', 0);
        //.attr('visibility', 'hidden')

        codeText
        .append('tspan')
          .attr('class', 'title-in-text')
          .text(`Процент трудоустройства 75%`)
  
          codeText
        .append('tspan')
          .attr('dy', 50)
          .attr('x', 0)
          .text('Банкоское дело')
          .append('tspan')
          .attr('x', 220)
          .text('15%')
     
          codeText
        .append('tspan')
          .attr('dy', 30)
          .attr('x', 0)
          .text("Системное администрирование")
          .append('tspan')
          .attr('x', 220)
          .text('17%')
     
     
          codeText
        .append('tspan')
          .attr('dy', 30)
          .attr('x', 0)
          .text('Реклама')
          .append('tspan')
          .attr('x', 220)
          .text('14%')
  
          codeText
        .append('tspan')
          .attr('dy', 30)
          .attr('x', 0)
          .text("Телекоммуникации")
          .append('tspan')
          .attr('x', 220)
          .text('16%')
  
          codeText
        .append('tspan')
          .attr('dy', 30)
          .attr('x', 0)
          .text("Разработка веб-приложений")
          .append('tspan')
          .attr('x', 220)
          .text('15%')
      
          codeText
        .append('tspan')
          .attr('dy', 30)
          .attr('x', 0)
          .text("Тех. поддержка")
          .append('tspan')
          .attr('x', 220)
          .text('13%')
  
          codeText
        .append('tspan')
          .attr('dy', 30)
          .attr('x', 0)
          .text("Проектирование баз данных")
          .append('tspan')
          .attr('x', 220)
          .text('10%')


    const colophon = chart.append('g').attr('id', 'colophon-ctnr');

    colophon.append('line')
      .attr('x1', 100)
      .attr('x2', 900)
      .attr('y1', 700)
      .attr('y2', 700)
      .attr('stroke-width', 0.5)
      .attr('stroke', '#9C9C9C');

    colophon.append('rect')
      .attr('height', 20)
      .attr('width', 100)
      .attr('x', 246)
      .attr('y', 717)
      .attr('stroke', 'black')
      .attr('stroke-width', 0.5)
      .attr('fill', 'white');
    
    colophon.append('text')
      .attr('class', 'colophon-text')
      .attr('x', 100)
      .attr('y', 730)
      .text('© 2019 Christopher Nourse')
      
    colophon.append('text')
      .attr('class', 'colophon-text')
      .attr('x', 250)
      .attr('y', 730)
      .text('Typeface used is ')
      .append('a')
        .attr('class', 'link-in-text')
        .attr('xlink:href', 'https://fonts.google.com/specimen/Forum')
        .attr('target', '_blank')
        .text('Forum')
      

    // Function for drawing areas
    function drawArea (container, loc, d) {
      let area = container
        .append('path')
        .attr('class', 'area')
        .attr('id', loc + '-area')
        .attr('d', d)
        .property('extended', 'n')
        .property('firstY', +d.split(/(?=[LMCZ])/)[1].split(",")[1])
        .property('maxY', +d.split(/(?=[LMCZ])/)[1].split(",")[1] - yShiftUp)

      // Define the animations
      container
        .on('mouseover', function() {
          let ctnr = d3.select(this);
          let ctnr_id = ctnr.attr('id');
          let id = ctnr_id.replace('-ctnr', '');
          const obj = d3.select('#' + id)

          shifter(obj, id, 'up')
       }
        ).on('mouseout', function() {
            let ctnr = d3.select(this);
            let ctnr_id = ctnr.attr('id');
            let id = ctnr_id.replace('-ctnr', '');
            const obj = d3.select('#' + id)

            shifter(obj, id, 'down')
        }
        )

      return area
    }

    function shifter (obj, id, direction) {

      let currentYShift = +obj.attr('d').split(/(?=[LMCZ])/)[1].split(",")[1];
      let initialY = obj.property('firstY');
      let finalY = obj.property('maxY');

      const shiftY = (direction === 'up') ? Math.abs(finalY - currentYShift)
                                          : currentYShift - initialY;
      const opacity = (direction === 'up') ? 1 : 0.8;
      const duration = (direction === 'up') ? 3000 * (1 - ((400 - shiftY) / 400))
                                            : 3000 * (1 - ((400 + shiftY) / 400));
      const textDuration = (direction === 'up') ? duration : duration - 500;
      const visibility = (direction === 'up') ? 'visible' : 'hidden';
      const finalOpacity = (direction === 'up') ? 1 : 0;

      obj
        .transition()
        .duration(100)
        .style('opacity', opacity);

      setTimeout(() =>
        {obj
          .transition()
          .duration(duration)
          .attrTween('d', function(d) { return dTween(obj, shiftY); })
        }, 120)
      
        if (id === 'top-area') {
          let s = d3.select('#main-text-2021')
          s.transition().duration(textDuration).attrTween('opacity', (d) => { return opacityTween(s, finalOpacity) })
        } else if (id === 'middle-area') {
          let s = d3.select('#main-text-2022')
          s.transition().duration(textDuration).attrTween('opacity', (d) => { return opacityTween(s, finalOpacity) })
        } else if (id === 'bottom-area') {
          let s = d3.select('#main-text-2023')
          s.transition().duration(textDuration).attrTween('opacity', (d) => { return opacityTween(s, finalOpacity) })
        } else {
          console.log('No text to hide???')
        }
      }

    function drawLabels (container, text) {
      container
        .append('text')
        .attr('class', 'label')
        .attr('id', 'label-' + text.toLowerCase())
        .attr('text-anchor', 'end')
        .text(text)
    }
  
    function shiftPath (d, yDelta) {
      // d: the d attribute to move
      // yDelta: how many pixels to change it
      // extended: is the
  
      const splitD = d.split(/(?=[LMCZ])/);

      let splitDArray = [];
      for (let i=0; i < splitD.length; i++) {
        let splitSomeMore = splitD[i].split(/(?=[,LMCZ])/);
        
        if (i !== 0 && i !== splitD.length - 2) {
          for (let j=0; j < splitSomeMore.length; j++) {
            if (j % 2 !== 0) {
              splitSomeMore[j] = +(splitSomeMore[j].replace(",",""));
              splitSomeMore[j] -= yDelta;
              splitSomeMore[j] = "," + splitSomeMore[j];
            }
          }
        }
  
        splitDArray.push(splitSomeMore.join(""));
      }
  
      return splitDArray.join("");
    }

    function opacityTween (obj, finalOpacity) {
      const intialOpacity = obj.attr('opacity');
      const interpolate = d3.interpolateNumber(intialOpacity, finalOpacity);
      return function(t) {
        return interpolate(t);
      }
    }


    function dTween(obj, yDelta) {
      // obj (d3 d3.selection from the DOM): Object that will be moved

      const initialD = obj.attr('d');
      const interpolate = d3.interpolateNumber(0, yDelta);

      return function(t) {
        const shifting = interpolate(t);
        const finalD = shiftPath(initialD, shifting);

        return finalD;

      };
    }