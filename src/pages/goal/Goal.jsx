import React from 'react';
import './Goal.css';
import "boxicons";
import "boxicons/css/boxicons.min.css";
const GoalFeatures = () => {
  return (
    <div id="goals">
      <div className="container">
        <div className="row">
          <div className="col-goal-col">
            <div className="goal-item">
              <h3>Mission</h3>
              <hr />
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum aspernatur tempore in. Ipsa corporis, possimus quos!
              </p>
            </div>
          </div>

          <div className="col-goal-col">
            <div className="goal-item">
              <h3>Vision</h3>
              <hr />
              <p>
                Consectetur tatibus eaque eveniet iste iure facere, asperiores officiis inventore ipsa. Libero dicta odit quia.
              </p>
            </div>
          </div>

          <div className="col-goal-col">
            <div className="goal-item">
              <h3>Passion</h3>
              <hr />
              <p>
                Ipsum dolor lorerm sit amet, consectetur adipisicing elit. Dolore sit officiis voluptatem quisquam placeat?
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalFeatures;