import { handler } from "tailwindcss-animate";
import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";


// Create a new task with the given text
export const createTask = mutation({
  args: { text: v.string() },
  handler: async (ctx: any, args: any) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError("Not authenticated");
    }

    const newTaskId = await ctx.db.insert("tasks", { text: args.text });
    return newTaskId;
  },
});


export const getFiles = query({ 
  args: {},
  async handler(ctx: any, args: any) {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError("Not authenticated");
    }
    return ctx.db.query("tasks").collect();
  }});