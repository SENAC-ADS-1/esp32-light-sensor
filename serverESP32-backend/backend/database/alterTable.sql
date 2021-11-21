ALTER TABLE public.device_control
    ADD COLUMN status smallint NOT NULL;

COMMENT ON COLUMN public.device_control.status
    IS '1 = on, 0 = off';

ALTER TABLE public.device_control
    ALTER COLUMN datetime SET NOT NULL;