import pgClient from "./pg-client";
import sqls from "./sqls";

const pgApiWrapper = async () => {
  const { pgPool } = await pgClient();
  const pgQuery = (text, params = {}) =>
    pgPool.query(text, Object.values(params));

  return {
    taskMainList: async () => {
      const pgResp = await pgQuery(sqls.tasksLatest);
      return pgResp.rows;
    },
    userInfo: async (userId) => {
      const pgResp = await pgQuery(sqls.usersFromIds, { $1: [userId] });
      console.log(pgResp.rows[0], "what");
      return pgResp.rows[0];
    },
    usersInfo: async (userIds) => {
      const pgResp = await pgQuery(sqls.usersFromIds, { $1: userIds });
      return userIds.map((userId) =>
        pgResp.rows.find((row) => userId === row.id)
      );
    },
    approachLists: async (taskIds) => {
      const pgResp = await pgQuery(sqls.approachesForTaskIds, {
        $1: taskIds,
      });
      return taskIds.map((taskId) =>
        pgResp.rows.filter((row) => taskId === row.taskId)
      );
    },
    approachList: async (taskId) => {
      const pgResp = await pgQuery(sqls.approachesForTaskIds, {
        $1: [taskId],
      });
      return pgResp.rows;
    },
  };
};

export default pgApiWrapper;
