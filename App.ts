import express, { Application, Request, Response, NextFunction } from "express";
import createError from "http-errors";
import cors from "cors";
import { Server, Socket } from "socket.io";
import type {
  PollState,
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData,
} from "./src/types/indexType";
import UserRoute from "./src/routes/user.route";
import AuthRoute from "./src/routes/auth.route";
import SubdistrictRoute from "./src/routes/subdistrict.route";
import WardRoute from "./src/routes/ward.route";
import VotingPlaceRoute from "./src/routes/voting-place.route";
import ElectorRoute from "./src/routes/elector.route";
import CoordinatorRoute from "./src/routes/coordinator.route";
import VPPRRoute from "./src/routes/vppr.route";

class App {
  public app: Application;
  private server: any;
  private io: Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >;

  constructor() {
    this.app = express();
    this.server = require("http").createServer(this.app);
    this.io = new Server<
      ClientToServerEvents,
      ServerToClientEvents,
      InterServerEvents,
      SocketData
    >(this.server, {
      cors: {
        origin: `*`,
        methods: ["GET", "POST", "PUT", "DELETE"],
      },
    });
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeSocket();
  }

  private initializeMiddlewares(): void {
    this.app.use(express.json());
    this.app.use(cors({ origin: `*` }));
  }

  private initializeRoutes(): void {
    this.app.get("/", (req: Request, res: Response) => {
      res.send(`
      <h1>Running correctly</h1>
    `);
    });

    this.app.use("/users", UserRoute.routes());
    this.app.use("/subdistricts", SubdistrictRoute.routes());
    this.app.use("/wards", WardRoute.routes());
    this.app.use("/coordinators", CoordinatorRoute.routes());
    this.app.use("/voting-places", VotingPlaceRoute.routes());
    this.app.use("/vpprs", VPPRRoute.routes());
    this.app.use("/electors", ElectorRoute.routes());
    this.app.use("/auth", AuthRoute.routes());

    // Routes not found
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      next(createError(404));
    });
  }

  private initializeSocket(): void {
    // All your Socket.io logic here
    // Such as io.use(addUserToSocketDataIfAuthenticated);
    // And the io.on('connection', ...) logic.
  }

  public listen(port: string | number): void {
    this.server.listen(port, () => {
      console.log(`⚡️[server]: Server is running at http://127.0.0.1:${port}`);
    });
  }
}

export default App;
