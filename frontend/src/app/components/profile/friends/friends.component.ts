import { Component, OnInit } from '@angular/core';
import { Friend } from '../../../models/friend.model';
import { FriendsService } from '../../../services/friends.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
  hideForm: boolean = true;
  friendsList: Friend[] = [];
  friendForm = new FormGroup({
    username:new FormControl('')
  });
  constructor(private friendsService: FriendsService) {
  }

  ngOnInit(): void {
    this.getFriendsList();
  }

  // Function to fetch list of friends for the user
  getFriendsList(): void{
    this.friendsService.getFriends().subscribe(friends => this.friendsList = friends);
  }

  // To hide/unhide the addFriend form
  toggleForm(): void{
    this.hideForm=(this.hideForm) ? false:true;
  }

  onDelete(friend:Friend): void{

    //this.friendsService.removeFriend(friend._id).subscribe();
    const index = this.friendsList.indexOf(friend, 0);
    if (index > -1) {
      this.friendsList.splice(index, 1);
    }
    // TODO: call to service to delete this friendship
  }

  onSave(): void{  
    this.friendsService.addFriend(this.friendForm.get('username')!.value).subscribe(friend => this.friendsList.push(friend));
  }
}
