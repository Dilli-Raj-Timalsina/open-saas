/**
 * conditions :
  1. There are 300 stocks whose price gets updated every 30 seconds , It's price sometimes increases an sometimes decreases .
  2. There are series of events in the random interval of time where the price of stocks hits x  by incrementing or decrementing the price of stock . That event might occur every 30 seconds or in 30 minutes , it's so random .
  

 * problem statement :
  1. user can subscribe or add an alert for a particular stock at particular price , e.g user with userId 9 adds a alert per stock named 'NABIL' whenever stock price of 'NABIL' increases 300.
  2. user can remove the alert .
  
 * specs :
  - database - postgres 
  - orm - typeorm
  - server - nodejs 
  - framework - nestjs 
  - no of users - 100k
  - no of add alert operation - no of user * 10 each = 1 million 
  - no of remove alert operation - no of user * 10 each = 1 million


 * approaches : 
  1. Triggers - we have to set 1 million triggers with diffrent definations and in server side we can handle price checking logic for respective user and notify client side application .
    - There are several limitation of triggers for this specs as mentioned below 
    i) Triggers does not allow setting meta information in trigger defination such as userId, Interval types such that price checking logic will run each time for all userrId .
    ii) removing trigger definations is quite challenging since there is no identification of trigger for each user .

 2. Cron Jobs - we can maintain a list of alert for individual user and stocks (for alerted only stocks) and run a price cheking logic every 'x' seconds and run price checking logic for respective user and notify sient side application .
 -  adding and removing alert check is quite intuitive since we are mainting an array of userId, stocks , price , interval type .
 - price checking logic only runs for added stock names 
 */
