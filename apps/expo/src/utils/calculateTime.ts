export default function calculateTimeAgo(timeSent: string): string {
  // parse time strings
  // time must be in format of YYYY-MM-DDTHH:MM:SS.202Z
  const currentUTCTime = new Date();
  const timeSentUTCTime = new Date(timeSent);

  // error check to see if the time sent is somehow in the future
  // in this case we won't display the time
  if(timeSentUTCTime > currentUTCTime){
    return ""
  }

  // calc the difference in seconds between the two times
  const diffInSeconds = Math.floor((currentUTCTime.getTime() - timeSentUTCTime.getTime()) / 1000);

  // calc the difference in minutes, hours, or days based on the difference in seconds
  let timeAgo = '';

  // this is how popular social media apps display the time
  // if time is less than a minute, label it as Just now
  if (diffInSeconds < 60) {
    timeAgo = 'Just now';
  } 
  
  // if less than an hour, round to minutes
  else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    timeAgo = `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
  } 

  // if less than a day, round to hours
  else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    timeAgo = `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  } 

  // if less than a week, round to days
  else if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400);
    timeAgo = `${days} day${days !== 1 ? 's' : ''} ago`;
  }

  // else just use weeks
  else {
    const weeks = Math.floor(diffInSeconds / 604800);
    timeAgo = `${weeks} week${weeks !== 1 ? 's' : ''} ago`;
  }

  return timeAgo;
}
