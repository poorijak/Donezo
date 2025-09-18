import CreateTaskBTN from '@/feature/task/components/create-task-btn'
import TaskContainer from '@/feature/task/components/dnd/tasks-container'
import React from 'react'

const page = () => {
  return (
     <div className="flex mx-auto justify-center items-center flex-col gap-8">
      <div className="flex justify-center items-center gap-5 flex-col">
        <h1 className="text-3xl font-bold">
          Create your{" "}
          <span className="bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
            Task{" "}
          </span>
          ✨
        </h1>

        <CreateTaskBTN/>
      </div>

      <div>
        <TaskContainer />
      </div>
    </div>
  )
}

export default page
