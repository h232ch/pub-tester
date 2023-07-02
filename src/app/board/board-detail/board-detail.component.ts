import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ApiService} from "../../api.service";
import {Board} from "../../models/Board";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {Comment} from "../../models/Comment"




@Component({
  selector: 'app-board-detail',
  templateUrl: './board-detail.component.html',
  styleUrls: ['./board-detail.component.css']
})
export class BoardDetailComponent implements OnInit {

  board!: Board;
  editSw: boolean = false;
  cmtSw: boolean = false;
  comment: {} ={
    comment: '',
    comment_id: '',
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'))
    this.apiService.getBoard(id)
      .subscribe(board => {
        this.board = board;
      }
    )
  }

  constructor(private apiService: ApiService,
              private route: ActivatedRoute,
              private location: Location) {
  }

  goBack() {
    this.location.back()
  }

  editSwitch(val: boolean) {
    this.editSw = val
  }

  boardUpdated(board: Board) {
    this.board = board;
    this.editSwitch(false);
  }

  boardDeleted(board: Board) {
    this.apiService.deletedBoard(board.id).subscribe(
      () => {
        this.goBack()
      }
    );
  }

  commentCreated(event: any) {
    this.board.comments.push(event);
    this.cmtSwitch(false);
  }

  commentSet(comment:{}) {
    this.comment = comment;
  }

  cmtSwitch(event: boolean) {
    this.cmtSw = event
    this.comment = {
      comment : '',
      comment_id : '',
    }
  }

  commentUpdated() {
    this.cmtSwitch(false);
    this.getDetail();
  }

  getDetail() {
    this.apiService.getBoard(this.board.id)
      .subscribe(board => {
        this.board = board;
      })
  }

  commentDelete(comment: Comment) {
    this.apiService.deletedComment(comment.id).subscribe(
      () => {
        this.getDetail()
      }
    );
  }
}
