$(document).ready(function () {

    let messages = [];
    let messageId = 0;

    let boards = [];
    let boardsId = 0;

    class Message {
        constructor(text, color) {
            this.text = text;
            this.color = color;
            this.id = messageId;
        }
    }

    class Board {
        constructor(title, color) {
            this.title = title;
            this.color = color;
            this.id = boardsId;
        }
    }

    Message.prototype.create = function () {
        let html =
            `<li id="message` + this.id + `" class="msgDrag"> ` + this.text + `<button class="btn btn-danger deleteButton "id="delete` + this.id + `">
        <i class="far fa-trash-alt"></i></button> 
        <button class="btn btn-success editButton "id="edit` + this.id + `"><i class="far fa-edit"></i></button> </li> `;

        $("#ul-hold").append(html);
        makeDraggable(this.id);
        editColorMessage(this.id);

        $("#message" + messageId).draggable({
            revert: true,
            helper: 'clone'
        });
        messageId++;
    }

    Message.prototype.delete = function () {
        $('#message' + this.id).remove();
    }

    Board.prototype.create = function () {
        let html =
            `<div class="col-md-2 boardStyleSoloBackground" id="board` + this.id + `">
        <div class="card box-shadow boardStyleCollect">
            <div class="card-header">
                <span class="boardTitle">`+ this.title + `</span>
                <div class="dropdown">
                            <button class="btn btn-secondary dropdown-toggle iconBoardTitleButton" type="button" id="dropdownMenuButton"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            </button>
                            <div class="dropdown-menu buttonsBoard" aria-labelledby="dropdownMenuButton">
                                <button class="buttonsBoardSolo">Change Board Title</button>
                                <br>
                                <button class="buttonsBoardSolo">Change Board Color</button>
                                <br>
                                <button class="buttonsBoardSolo" id="deleteBoardButton">Delete Board </button>
                            </div>
                        </div>
            </div>
            <div class="card-body bodyStyle" id="cardBody`+ this.id + `">
                <div class="card-text">
                    <ul class="list-unstyled list-messages" id="ul-hold">

                    </ul>
                </div>
            </div>
        </div>
    </div>`;

        $('#rowBoards').append(html);
        makeDraggable(this.id);
        boardsId++
    }

    function startBoards() {
        let names = ['HOLD', 'PROGRESS', 'DONE']


        for (let i = 0; i < names.length; i++) {
            let board = new Board(names[i], 'red');
            board.create();
        }

    }

    function buttons() {
        $('#AddMessageButton').click(function (e) {
            let text = $('#inputAddMessage').val();
            let message = new Message(text, "red");

            messages.push(message);
            console.log(message);

            message.create();

            $('#inputAddMessage').val("");

            $('.deleteButton').click(function (e) {
                let id = this.id;
                let myString = id.replace(/\D/g, '');
                let intID = parseInt(myString, 10);

                messages[intID].delete();
                console.log(intID);
            });
        });

        $("#AddBoardButton").click(function (e) {
            let title = $("#inputAddBoard").val();
            let board = new Board(title, "red");
            boards.push(board)

            board.create();
            $('#inputAddBoard').val("");
            console.log(board);
        });

    }

    function makeDraggable(id) {
        $('#cardBody' + id).droppable({
            accept: ".msgDrag",
            drop: function (event, ui) {
                $('#cardBody' + id).append(ui.draggable);
            }
        });
    }

    function editColorMessage(id) {
        $("#edit" + id).click(function (e) {
            let newId = this.id;
            let myString = newId.replace(/\D/g, '');
            let intID = parseInt(myString, 10);
            
            $(".addingBoards").append(`<div id="dialog`+ id +`" title="Change Color Message">a
        
            </div>`);

            $("#dialog" + id).dialog({
                position: { my: 'top-280', at:'left+550'},
            });
            $("#dialog" + id ).farbtastic(function () {
                $("#message" + intID).css("background-color", $.farbtastic("#dialog" + id).color);
            });

            console.log(intID);
        }); 
    }

    buttons();
    startBoards();

});