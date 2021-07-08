import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Home } from "../pages/Home";
import { Create } from "../pages/Create";

export const Routes = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/create" component={Create} />
        </Switch>
      </div>
    </Router>
  );
};
