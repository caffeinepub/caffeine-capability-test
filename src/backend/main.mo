import Map "mo:core/Map";
import Array "mo:core/Array";
import Text "mo:core/Text";
import Order "mo:core/Order";
import Principal "mo:core/Principal";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import Blob "mo:core/Blob";
import Nat "mo:core/Nat";
import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  // Initialize the access control system
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Initialize the storage system for file uploads
  include MixinStorage();

  // User Profile System
  public type UserProfile = {
    name : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Global counter state
  var globalCounter : Nat = 0;

  public shared ({ caller }) func incrementAndGetCounter() : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can increment counter");
    };
    globalCounter += 1;
    globalCounter;
  };

  public query ({ caller }) func getCounter() : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view counter");
    };
    globalCounter;
  };

  // Leaderboard implementation
  public type Entry = {
    name : Text;
    score : Nat;
  };

  module Entry {
    public func compareByScoreDescending(a : Entry, b : Entry) : Order.Order {
      Nat.compare(b.score, a.score);
    };
  };

  let leaderboardEntries = Map.empty<Text, Nat>();

  public shared ({ caller }) func addLeaderboardEntry(name : Text, score : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can add leaderboard entries");
    };
    leaderboardEntries.add(name, score);
  };

  public query ({ caller }) func getLeaderboard() : async [Entry] {
    // Public read access - no authorization check needed
    let entriesArray = leaderboardEntries.entries().map(
        func((name, score)) : Entry { { name; score } }
      ).toArray();
    entriesArray.sort(Entry.compareByScoreDescending);
  };

  // Test JSON response
  public query ({ caller }) func testJsonResponse() : async Text {
    // Public endpoint - no authorization check needed
    "{ \"message\": \"Hello from backend!\", \"status\": \"success\" }";
  };

  // Image upload system
  public type Image = {
    id : Text;
    filename : Text;
    uploader : Principal;
    contentType : Text;
    blob : Storage.ExternalBlob;
  };

  let uploadedImages = Map.empty<Text, Image>();

  public shared ({ caller }) func uploadImage(filename : Text, contentType : Text, blob : Storage.ExternalBlob) : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can upload images");
    };
    let id = filename; // Simplified unique ID generation
    let image : Image = {
      id;
      filename;
      uploader = caller;
      contentType;
      blob;
    };
    uploadedImages.add(id, image);
    id;
  };

  public query ({ caller }) func getImageMetadata(imageId : Text) : async ?Image {
    // Public read access - no authorization check needed
    uploadedImages.get(imageId);
  };

  public query ({ caller }) func getAllImageMetadata() : async [Image] {
    // Public read access - no authorization check needed
    uploadedImages.values().toArray();
  };

  public type ApiResponse = {
    imageId : Text;
    name : Text;
    contentType : Text;
  };

  public query ({ caller }) func getAllImages() : async [ApiResponse] {
    // Public read access - no authorization check needed
    uploadedImages.values().toArray().map(func(img) { { imageId = img.id; name = img.filename; contentType = img.contentType } });
  };
};
