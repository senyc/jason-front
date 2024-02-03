interface SettingsFloatProps {
  shouldDisplay: boolean;
  exitAction: () => void;
}
export default function SettingsFloat({ shouldDisplay, exitAction }: SettingsFloatProps) {
  return shouldDisplay && (
    <section>

    </section>
  );
}
