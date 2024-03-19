import "./topBox.scss";
import { topDealUsers } from "../../data.ts";

const topBox = () => {
  return (
    <div className="topBox">
      <div className="h1d">
        <h1>Actividades Recientes</h1>
      </div>

      <div className="list">
        {topDealUsers.map(user => (
          <div className="listItem" key={user.id}>
            <div className="user">
              <div className="userTexts">
                <span className="username">{user.username}</span>
                <span className="type">{user.type}</span>
              </div>
            </div>
            <span className="action">{user.action}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default topBox