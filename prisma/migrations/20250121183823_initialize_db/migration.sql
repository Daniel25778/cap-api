-- CreateEnum
CREATE TYPE "MatchType" AS ENUM ('NORMAL', 'TOURNAMENT');

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,
    "finishedAt" TIMESTAMPTZ,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "match" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "type" "MatchType" NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,
    "finishedAt" TIMESTAMPTZ,

    CONSTRAINT "match_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "player" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "nickname" VARCHAR(150),
    "instagram" VARCHAR(150),
    "isOnGuild" BOOLEAN DEFAULT false,
    "isMember" BOOLEAN DEFAULT false,
    "totalKills" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,
    "finishedAt" TIMESTAMPTZ,

    CONSTRAINT "player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "player_team" (
    "id" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "matchTeamId" TEXT NOT NULL,
    "kill" INTEGER NOT NULL,

    CONSTRAINT "player_team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "match_team" (
    "id" TEXT NOT NULL,
    "matchId" TEXT NOT NULL,
    "position" INTEGER NOT NULL,

    CONSTRAINT "match_team_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "player_name_key" ON "player"("name");

-- AddForeignKey
ALTER TABLE "player_team" ADD CONSTRAINT "player_team_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "player_team" ADD CONSTRAINT "player_team_matchTeamId_fkey" FOREIGN KEY ("matchTeamId") REFERENCES "match_team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "match_team" ADD CONSTRAINT "match_team_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "match"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
