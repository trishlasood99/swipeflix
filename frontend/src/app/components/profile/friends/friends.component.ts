import { Component, OnInit } from '@angular/core';
import { Friend } from '../../../models/friend.model';
import { FriendsService } from '../../../services/friends.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
  hideForm: boolean = true;
  friendsList: Friend[] = [];
  friendUsername = new FormControl('');

  constructor(private friendsService: FriendsService) {
  }

  ngOnInit(): void {
    this.getFriendsList();
  }

  // Function to fetch list of friends for the user
  getFriendsList(): void{
    this.friendsService.getFriends().subscribe(friends => this.friendsList = friends);
    console.log(this.friendsList);
  }

  // To hide/unhide the addFriend form
  toggleForm(): void{
    this.hideForm=(this.hideForm) ? false:true;
  }

  onDelete(friend:Friend): void{
    const index = this.friendsList.indexOf(friend, 0);
    if (index > -1) {
      this.friendsList.splice(index, 1);
    }
    // TODO: call to service to delete this friendship
  }

  onSave(): void{
    // TODO: call to service to add new friendship

    const newFriend:Friend = {
      _id: "x",
      friend1: "x",
      friend2: "x",
      username1: "x",
      username2: this.friendUsername.value,
      __v: 0,
    };
    console.log(this.friendUsername.value);
    this.friendsList.push(newFriend);
  }
}
