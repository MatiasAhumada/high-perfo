"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { UI_TEXTS } from "@/constants/ui-texts.constant";

const athleteSchema = z.object({
  firstName: z
    .string()
    .min(2, UI_TEXTS.FORM_ERRORS.MIN_LENGTH.replace("{min}", "2")),
  lastName: z
    .string()
    .min(2, UI_TEXTS.FORM_ERRORS.MIN_LENGTH.replace("{min}", "2")),
  position: z.string().min(1, UI_TEXTS.FORM_ERRORS.REQUIRED),
  birthDate: z.string().min(1, UI_TEXTS.FORM_ERRORS.REQUIRED),
  sport: z.string().min(1, UI_TEXTS.FORM_ERRORS.REQUIRED),
});

type AthleteFormData = z.infer<typeof athleteSchema>;

interface AthleteFormProps {
  onSubmit: (data: AthleteFormData) => void;
  defaultValues?: Partial<AthleteFormData>;
}

const INPUT_CLASSES =
  "w-full bg-transparent border-b border-outline-variant/50 text-on-surface placeholder:text-on-surface-variant/30 focus:border-on-tertiary-container focus:outline-none pb-2 pt-3 sm:pt-4 text-sm font-body transition-colors";

export function AthleteForm({ onSubmit, defaultValues }: AthleteFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<AthleteFormData>({
    resolver: zodResolver(athleteSchema),
    defaultValues: defaultValues ?? {
      firstName: "",
      lastName: "",
      position: "",
      birthDate: "",
      sport: "",
    },
    mode: "onChange",
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 sm:space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <label className="text-[10px] sm:text-xs text-on-surface-variant/50 block mb-1">
            {UI_TEXTS.ATHLETES.FIRST_NAME}
          </label>
          <input
            {...register("firstName")}
            className={INPUT_CLASSES}
            placeholder="Nombre"
          />
          {errors.firstName && (
            <p className="text-on-tertiary-container text-xs mt-1">
              {errors.firstName.message}
            </p>
          )}
        </div>
        <div>
          <label className="text-[10px] sm:text-xs text-on-surface-variant/50 block mb-1">
            {UI_TEXTS.ATHLETES.LAST_NAME}
          </label>
          <input
            {...register("lastName")}
            className={INPUT_CLASSES}
            placeholder="Apellido"
          />
          {errors.lastName && (
            <p className="text-on-tertiary-container text-xs mt-1">
              {errors.lastName.message}
            </p>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <label className="text-[10px] sm:text-xs text-on-surface-variant/50 block mb-1">
            {UI_TEXTS.ATHLETES.POSITION}
          </label>
          <input
            {...register("position")}
            className={INPUT_CLASSES}
            placeholder="Delantero, Base..."
          />
          {errors.position && (
            <p className="text-on-tertiary-container text-xs mt-1">
              {errors.position.message}
            </p>
          )}
        </div>
        <div>
          <label className="text-[10px] sm:text-xs text-on-surface-variant/50 block mb-1">
            Deporte
          </label>
          <input
            {...register("sport")}
            className={INPUT_CLASSES}
            placeholder="Fútbol, Básquetbol..."
          />
          {errors.sport && (
            <p className="text-on-tertiary-container text-xs mt-1">
              {errors.sport.message}
            </p>
          )}
        </div>
      </div>
      <div>
        <label className="text-[10px] sm:text-xs text-on-surface-variant/50 block mb-1">
          {UI_TEXTS.ATHLETES.BIRTH_DATE}
        </label>
        <input
          type="date"
          {...register("birthDate")}
          className={INPUT_CLASSES}
        />
        {errors.birthDate && (
          <p className="text-on-tertiary-container text-xs mt-1">
            {errors.birthDate.message}
          </p>
        )}
      </div>
      <div className="flex justify-end gap-3 pt-2">
        <Button
          type="submit"
          disabled={!isValid}
          className="bg-on-tertiary-container text-on-surface hover:bg-on-tertiary-container/90 font-display rounded-lg"
        >
          {UI_TEXTS.ACTIONS.SAVE}
        </Button>
      </div>
    </form>
  );
}
