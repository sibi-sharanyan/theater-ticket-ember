import Component from "@ember/component";

export default Component.extend({
  mydata: Ember.inject.service("mydata"),

  init() {
    this._super(...arguments);
    this.set("seatobj", []);
    this.set("selectedseats", []);
    var theater;
    $.ajax("/ticketapp/records").then(data => {
      var screen = this.get("mydata").showid;
      var movie = this.get("mydata").movie;
      var obj = [];
      for (var i = 0; i < data.data.length; i++) {
        if (data.data[i].id == screen) {
          theater = data.data[i].theaterName;
          this.set("dataobj", data.data[i]);

          break;
        }
      }

      $.ajax("/ticketapp/movie").then(data => {
        for (var i = 0; i < data.data.length; i++) {
          if (data.data[i].movieName == movie) {
            this.set("movieobj", data.data[i]);
            break;
          }
        }

        $.ajax("/ticketapp/theater").then(data => {
          for (var i = 0; i < data.data.length; i++) {
            if (data.data[i].theaterName == theater) {
              this.set("theaterobj", data.data[i]);
              break;
            }
          }
        });

        $.ajax("/ticketapp/seat").then(data => {
          var rows = [];

          var cnt = 0,
            freecnt = 0,
            takencnt = 0;
          for (var i = 0; i < data.data.length; i++) {
            if (data.data[i].showId == screen) {
              cnt++;
              if (data.data[i].status == "free") freecnt++;
              else if (data.data[i].status == "taken") takencnt++;
              this.get("seatobj").pushObject(data.data[i]);
              rows.push(data.data[i].rowId);
            }
          }
          let unique = [...new Set(rows)];
          var columns = [];

          var k = 0;
          for (var t = 0; t < unique.length; t++) {
            var temp = [{ seat: unique[t], status: "null" }];
            for (var j = 0; j < data.data.length; j++) {
              if (
                data.data[j].rowId == unique[t] &&
                screen == data.data[j].showId
              ) {
                temp.push({
                  id: data.data[j].seatId,
                  seat: data.data[j].columnId,
                  status: data.data[j].status,
                  type: data.data[j].type,
                  cost: data.data[j].cost,
                  row: data.data[j].rowId,
                  reservedBy: data.data[j].reservedBy
                });
              }
            }
            columns.push(temp);
          }

          this.set("columns", columns);
          this.set("tickets", freecnt + takencnt);
          this.set("freecnt", freecnt);
          this.set("takencnt", takencnt);
        });
      });
    });
  },
  actions: {
    doneclick(id) {
      var status = $("#" + id).attr("class");
      if (status == "free") {
        this.get("mydata").addSeat(id);
        $("#" + id).addClass("selected");
      } else if (status == "free selected") {
        this.get("mydata").removeSeat(id);
        $("#" + id).removeClass("selected");
      }
    }
  }
});
