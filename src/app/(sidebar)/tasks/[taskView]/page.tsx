import { TaskView } from "@/src/lib/annotations/taskView";
import NewTaskDisplay from "../newTaskDisplay";
import TaskDashboard from "../taskDashboard";
import TaskHeader from "../taskHeader";
import { getLastAccessedTime } from "../actions";
import SettingsDialog from "../settingsDialog";
import { getCurrentEmailAddress, getProfilePhoto } from "@/src/lib/components/sidebar/actions";

export default async function Tasks({ params }: { params: { taskView: TaskView; }; }) {
  return (
    <>
      <TaskHeader
        taskView={params.taskView}
        sinceLastSync={await getLastAccessedTime()}
      />

      <section
        className="mx-auto w-11/12 md:w-10/12 xl:w-9/12 2xl:w-8/12"
      >
        <NewTaskDisplay />
        <div className="pb-3" />
        <div className='my-3 flex w-full flex-row justify-end'>
        </div>
        <TaskDashboard
          taskView={params.taskView}
        />
        <SettingsDialog
          profilePhotoSource={`/profile_photo_${await getProfilePhoto()}.jpg`}
          emailAddress={await getCurrentEmailAddress()}
        />
      </section>
    </>
  );
}
